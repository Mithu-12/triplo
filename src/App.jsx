// import { RouterProvider } from 'react-router-dom';
// import router from './routes/routes';
// import './App.css'
// import { useDispatch } from 'react-redux';
// import { setUser } from './slices/authSlice';
// import { useEffect } from 'react';

// function App() {
//   const dispatch = useDispatch();

//   // Function to handle successful login
//   const handleLoginSuccess = async () => {
//     try {
//       const response = await fetch('http://localhost:8800/api/auth/login/success', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const token = data.access_token;
//         localStorage.setItem('access_token', token);
//         console.log('Authentication successful:', data);

//         dispatch(setUser({ ...data.user, access_token: token }));
//       } else {
//         console.error('Authentication failed:', data);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {

//     handleLoginSuccess();
//   }, []);

//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// }

// export default App;



import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import './App.css'
import { useDispatch } from 'react-redux';
import { setUser } from './slices/authSlice';
import { useEffect } from 'react';


function App() {
  const dispatch = useDispatch();

  
// useEffect(()=>{
//   async function handleLoginSuccess() {
//     try {
//       const response = await fetch('http://localhost:8800/api/auth/login/success', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add any additional headers if needed
//         },
//         credentials: 'include', // Include cookies in the request
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         // Authentication successful
//         const token = await data.access_token;
//         localStorage.setItem('access_token', token)
//         console.log('Authentication successful:', data);

//         dispatch(setUser({...data.user, access_token: token})); 
//         // navigate(from, {replace: true})
//       } else {
//         // Authentication failed
//         console.error('Authentication failed:', data);
//         // Handle error and redirect as needed
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle error and redirect as needed
//     }
//   }
  
//   handleLoginSuccess()
// },[])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}


export default App;
