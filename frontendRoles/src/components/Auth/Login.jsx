import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import openEye from "./open.png";
import closedEye from "./close.png";
import bgImage from "./signupimg.jpg";
import { useNavigate  } from 'react-router-dom';
import { userContext, authContext } from "../../context";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

const LoginPage = () => { 
  const { setUser } = useContext(userContext);
  const { setAuth } = useContext(authContext);
  const [userId,setUserId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordFields, setShowForgotPasswordFields] = useState(false); // State to toggle forgot password fields
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    otp: "", // New field for OTP
    newPassword: "", // New field for new password
    confirmPassword: "" // New field for confirm password
  };

  const onSubmit = (values) => {
    if (showForgotPasswordFields) {
      // Handle forgot password submission
      handleForgotPassword(values);
    } else {
      // Handle normal login submission
      handleLogin(values);
    }
  };

  const handleLogin = (values) => {
    axios.post("https://manthanr.onrender.com/v1/login", {
      email: values.email,
      password: values.password
    }).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token); 
        // console.log(res.data.token);
        // console.log(res.data.user);
        setUserId(res.data.user._id); 
        setUser(res.data.user.username);
     
        setAuth(true);
        if(res.data.user.is_profile_complete){
      if(res.data.user.has_accepted_tnc){
        navigate('/chatbot');
      }
      else {
        navigate('/disclaimer')
      }
        }
        else {
          navigate('/updateprofile')
        }
        // console.log(res.data.user._id);
       

      }
    }).catch((err) => {
      console.log(err);
      // toast.error(err.response.data);
    });
  };

  const handleForgotPassword = (values) => {
    axios.post('https://manthanr.onrender.com/v1/sendOtp', { email: values.email }).then((res) => {
      if (res === 200) {
        // Handle sending OTP
        toast.success('OTP sent');
        // You can implement OTP verification and password update logic here
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForgotPasswordFields = () => {
    setShowForgotPasswordFields(!showForgotPasswordFields);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/chatbot');
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-200 font-montserrat">
      <div className="flex flex-col lg:flex-row bg-white justify-center items-center w-4/5 sm:w-3/5 lg:w-8/12 xl:w-3/5 shadow-xl rounded-xl">
        {/* Left section  */}
        <div className="flex-1">
          <img
            src={bgImage}
            alt="Background"
            className="w-full h-full object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
          />
        </div>
        {/* Right section  */}
        <div className="flex-1 bg-white py-4 px-6 rounded-b-xl lg:rounded-s-xl w-full sm:w-96">
          <h2 className="text-2xl font-bold mb-2 uppercase text-center">Login</h2>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors, touched ,values }) => (
              <Form>
                {/* Form fields here */}
                <div className="mb-4">
                  {/* Email */}
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`w-full px-2.5 py-1.5 border rounded-md focus:outline-none ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : " focus:border-black"
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4 relative">
                  {/* Password */}
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={`w-full px-2.5 py-1.5 border rounded-md focus:outline-none ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : " focus:border-black"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                  >
                    <img
                      src={showPassword ? openEye : closedEye}
                      alt="Toggle Password Visibility"
                      className="h-6 w-6"
                    />
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                {/* Display forgot password fields if showForgotPasswordFields is true */}
               
                {/* Submit button */}
                <div className="flex justify-between">
         
                    <button
                      type="button"
                      onClick={(values) => {
                      navigate('/forgot-password')
               
                      }}
                      className="underline mt-1 text-xs sm:text-base"
                    >
                      Forgot Password
                    </button>

                    <button className="bg-blue-500 px-4 py-2 rounded-md text-white mt-1 text-xs sm:text-base">
                      Login
                    </button>
          

        
                </div>       
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
