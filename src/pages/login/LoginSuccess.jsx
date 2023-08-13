import { useEffect } from 'react';
import { setUser } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
const LoginSuccess = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()

   const from = location.state?.from?.pathname || '/';
useEffect(()=>{
    async function handleLoginSuccess() {
      try {
        const response = await fetch('http://localhost:8800/api/auth/login/success', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
          },
          credentials: 'include', // Include cookies in the request
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Authentication successful
          const token = await data.access_token;
          localStorage.setItem('access_token', token)
          console.log('Authentication successful:', data);
  
          dispatch(setUser({...data.user, access_token: token})); 
          navigate(from, {replace: true})
        } else {
          // Authentication failed
          console.error('Authentication failed:', data);
          // Handle error and redirect as needed
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error and redirect as needed
      }
    }

    handleLoginSuccess()
   
  },[])

  useEffect(() => {
    const timeout = setTimeout(() => {
      
    }, 5000);

    return () => {
      clearTimeout(timeout);
      navigate(from, { replace: true });
    };
  }, [navigate, from]);

  return(
    <div className='success-login'>Thanks for Login Triplo</div>
  )
};

export default LoginSuccess;