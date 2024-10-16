import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "./adminimage.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  adminContext,
  adminEmailContext,
  superadminContext,
} from "../../context";
import Header from "../Home/Header";
import Bg from "./StudentLoginBackground.jpg";
import openEye from "./open.png";
import closedEye from "./close.png";

const AdminLogin = () => {
  const { admin, setAdmin } = useContext(adminContext);
  const { adminEmail, setAdminEmail } = useContext(adminEmailContext);
  const navigate = useNavigate();
  const { superadmin, setsuperadmin } = useContext(superadminContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    setLoading(true);
    axios
      .post(`${apiUrl}/single-login`, {
        email: values.email.toLowerCase(),
        password: values.password,
      })
      .then((res) => {
        if (res.data === "User login not allowed") {
          toast.error("Admins only. Students cannot log in.");
        }

        const token = res.data.token;
        if (token) {
          if (
            res.data.user.role === "admin" ||
            res.data.user.role === "warden"
          ) {
            localStorage.setItem("adminToken", token);
            toast.success("Welcome Admin");
            setAdmin({
              username: res.data.user.username,
              adminID: res.data.user._id,
            });
            setAdminEmail(res.data.user.email);
            navigate("/AdminDashboard");
            const object = {
              username: res.data.user.username,
              adminID: res.data.user._id,
              email: values.email,
            };
            // console.log(object)
            const storeObject = JSON.stringify(object);
            localStorage.setItem("admin", storeObject);
          } else if (res.data.user.role === "super admin") {
            setsuperadmin(res.data.user.username);
            localStorage.setItem("superadminToken", token);

            toast.success("SuperAdmin login successful");
            // setsuperadmin(values.email);
            const superadmin = res.data.user.username;

            localStorage.setItem("superadmin", superadmin);

            navigate("/SuperAdminDashboard");
          }
        }
      })
      .catch((err) => {
        console.log(err);

        if (err.response.status === 401 || err.response.status === 404) {
          toast.error("Please check Email or Password");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      navigate("/admindashboard");
    }
  }, []);

  const handleSendOTP = (values) => {
    // console.log(values);
  };
  const handleForgotPassword = () => {
    setShowForgotPasswordPopup(true);
  };

  const handleClosePopup = () => {
    setShowForgotPasswordPopup(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="bg-admin-back min-h-svh sm:min-h-screen flex justify-center items-center font-montserrat"
      // style={{
      //   backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${Bg})`,
      //   backgroundSize: "Cover",
      // }}
    >
      <Header />
      <div className="flex flex-col items-center min-w-lg bg-white shadow-xl rounded-xl mx-auto w-11/12 sm:w-fit">
        <div className="rounded-t-xl">
          <img src={Image} alt="" className="sm:max-w-sm rounded-t-xl" />
        </div>
        <div className="pt-2 py-2 px-4 rounded-b-xl shadow-md w-full">
          <h2 className="text-2xl font-bold text-center uppercase mb-2">
            Admin Login
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
                <div className="mb-4 relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline bg-admin-back"
                    required
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
                </div>
                <div className="flex justify-between">
                  <div>
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
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
                      {loading ? "logging in..." : "login"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
