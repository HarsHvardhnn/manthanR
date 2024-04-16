import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from '../Auth/adminimage.jpg';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { superadminContext } from "../../context";
import Header from "../Home/Header";

const SuperAdminLogin = () => {
  const {superadmin,setsuperadmin} =useContext(superadminContext);
  const navigate = useNavigate();
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    axios.post('https://manthanr.onrender.com/v1/super-login', {
      email: values.email,
      password: values.password
    }).then((res) => {
      if (res.status === 200) {
        const { token } = res.data;
        const {username}=  res.data.user;
        console.log(username)
        setsuperadmin(username);
        localStorage.setItem('superadminToken', token);
        toast.success('SuperAdmin login successful');
        // setsuperadmin(values.email);
        navigate('/SuperAdminDashboard');
      }
    }).catch((err) => {
      if(err.response.status === 401){
        toast.error('wrong password');

      }
      if(err.response.status===404){
        toast.error('please check email');
      }
    });
    console.log("Logging in with email:", values.email, "and password:", values.password);
  };

  useEffect(()=>{
    const token = localStorage.getItem('superadminToken');
    if(token){
        // console.log('token still here');
        navigate('/superadmindashboard');
    }
  },[]);
  
  return (
    <div className="bg-admin-back min-h-screen flex justify-center items-center font-montserrat">
      <Header/>
      <div className="flex flex-col items-center min-w-lg bg-white shadow-xl rounded-xl mx-auto w-11/12 sm:w-fit">
        <div className="rounded-t-xl">
          <img src={Image} alt="" className="sm:max-w-sm rounded-t-xl" />
        </div>
        <div className="pt-2 py-2 px-4 rounded-b-xl shadow-md w-full">
          <h2 className="text-2xl font-bold text-center uppercase mb-2">
            Super Admin Login
          </h2>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {() => (
              <Form className="max-w-80 mx-auto">
                <div className="mb-4">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline bg-admin-back"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline bg-admin-back"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div>
                    <button
                      type="button"
                      onClick={ ()=> navigate("/forgot-password")}
                      className="underline mt-1 font-medium"
                    >
                      Forgot Password
                    </button>
                  </div>
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="w-full font-medium bg-admin text-white py-1 px-4 rounded-md focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {showForgotPasswordPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 font-montserrat">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-11/12 sm:w-full">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Forgot Password</h2>
              <button
                className=" text-white py-1 px-4 font-medium rounded-md bg-admin transition duration-300 ease-in-out transform hover:scale-105"
                // onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
            <Formik initialValues={{ email: "" }} 
            // onSubmit={handleSendOTP}
            >
              {() => (
                <Form>
                  <div className="mb-4">
                    <Field
                      type="email"
                      id="forgotPasswordEmail"
                      name="forgotPasswordEmail"
                      placeholder="Enter Registered Email"
                      className="w-full px-2 py-1 bg-admin-back border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className=" bg-admin text-white font-medium py-1 px-4 rounded-md focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Send OTP
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminLogin;
