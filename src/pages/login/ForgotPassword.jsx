import React, { useEffect, useState } from "react";

import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faChevronRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputField from "../../components/inputField/inputField";
import useForm from "../../hooks/useForm";
import LoaderSpiner from "../../components/Loader/LoaderSpiner";
import axios from "axios";
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const initialState = {
    email: "",
  };
  const validateForm = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    return errors;
  };

  const {
    formState,
    handleBlur,
    handleChange,
    handleFocus,
    handleSubmit,
    reset,
  } = useForm({
    init: initialState,
    validate: validateForm,
  });

  const handleLoginSubmit = async ({ hasError, errors, values }) => {
    try {
      setLoading(true);
      if (!hasError) {
        const email = values.email;
        console.log("value", email);
        await axios
          .post(
            "https://tame-leggings-goat.cyclic.app/api/auth/forgot-password",
            { email: email }
          )
          .then((res) => {
            if (res.data.status === "success") {
              navigate("/forgot-password-instruction");
            }
          });
      }
    } catch (error) {
      console.log(error, "error");
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="text-xl font-semibold py-5">Forgot Password</h2>
        <form onSubmit={(e) => handleSubmit(e, handleLoginSubmit)}>
          <div className="custom-login-input-container">
            <InputField
              label="Email or Username"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formState.email.value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              error={formState.email.error}
              required
            />
          </div>

          {loading ? <LoaderSpiner /> : null}
          {error && <span className="text-red-600 ">{error}</span>}
          <div className="signup-button-container">
            <button className="signup-button" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
