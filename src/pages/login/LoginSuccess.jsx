import { useEffect } from "react";
import { setUser } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./Login.css";

const LoginSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    async function handleLoginSuccess() {
      try {
        const searchParams = new URLSearchParams(location.search);
        const userParam = searchParams.get("user");
        const userData = JSON.parse(decodeURIComponent(userParam));

        const response = await axios.post(
          "https://tame-leggings-goat.cyclic.app/api/auth/login/success",
          { user: userData },
          {
            withCredentials: true,
          }
        );

        const data = response.data;

        if (response.status === 200) {
          const token = data.access_token;
          localStorage.setItem("access_token", token);
          console.log("Authentication successful:", data);

          dispatch(setUser({ ...data.user, access_token: token }));
          navigate(from, { replace: true });
        } else {
          // Authentication failed
          console.error("Authentication failed:", data);
          // Handle error and redirect as needed
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error and redirect as needed
      }
    }

    handleLoginSuccess();
  }, [dispatch, navigate, from]);

  useEffect(() => {
    const timeout = setTimeout(() => {}, 5000);

    return () => {
      clearTimeout(timeout);
      navigate(from, { replace: true });
    };
  }, [navigate, from]);

  return <div className="success-login">Thanks for Login Triplo</div>;
};

export default LoginSuccess;
