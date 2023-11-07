import React, { useEffect } from 'react'
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const useAxiosSecure = () => {
    const navigate = useNavigate()
    const axiosSecure = axios.create({
        baseURL: 'https://triplo-flight.onrender.com'
    })

    useEffect(()=>{
        axiosSecure.interceptors.request.use((config)=>{
            const token = localStorage.getItem('access_token');
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        })
        axiosSecure.interceptors.request.use(
            (response)=> response,
            async(error)=>{
                if(error.response && (error.response.status === 401 || error.request.status === 403)){
                    await logout();
                    navigate('/login')
                }
                return Promise.reject(error)
          }

        )
    }, [logout, navigate, axiosSecure])

  return axiosSecure;
}

export default useAxiosSecure