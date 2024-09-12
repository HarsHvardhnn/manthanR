import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import { FaHome } from "react-icons/fa";
import Header from "../Home/Header";

const ForgotPassword = () => {
  const [showOTPFields, setShowOTPFields] = useState(false);
  const [wrongOtp, setWrongOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  };

  const checkEmail = (values) => {
    setLoading(true);

    if (!values.email) {
      setLoading(false);
      return;
    }

    axios
      .post("https://manthanr.onrender.com/v1/check-email", {
        email: values.email,
      })
      .then((res) => {
        if (res.data === "user doesnt exist") {
          toast.error("User not found");
        } else if (res.data === "user found please send otp") {
          sendOtp(values);
          setShowOTPFields(true);
        }
      })
      .catch((err) => {
        console.log("catch block", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sendOtp = (values) => {
    axios
      .post("https://manthanr.onrender.com/v1/send-otp", {
        email: values.email,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("OTP sent. Please enter it.");
        }
      })
      .catch((err) => {
        console.log("Error sending OTP", err);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP must be 6 digits")
      .required("OTP is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    axios
      .post("https://manthanr.onrender.com/v1/reset-password", {
        otpBody: values.otp,
        email: values.email,
        password: values.newPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Password changed successfully.");
          resetForm();
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          setWrongOtp(true);
          toast.error("Wrong OTP. Please try again.");
          resetForm();
          setShowOTPFields(false);
        }
      })
      .finally(() => {
        setLoading(false);
        setSubmitting(false);
      });
  };

  return (
    <>
      <Header />
      <div className="w-full bg-blue-200 h-screen flex items-center">
        <div className="w-11/12 sm:w-8/12 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto p-6 bg-white rounded-lg shadow-md font-montserrat">
          <div className="flex justify-between mx-1 mb-6 border-b-2">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold uppercase">
              Change Password
            </h2>
            <div className="text-white rounded-lg my-auto bg-blue-500 hover:bg-blue-600 mb-1">
              <button
                className="py-1 px-2"
                onClick={() => {
                  navigate("/");
                }}
              >
                <FaHome />
              </button>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, handleBlur, values, resetForm }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-600">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    onBlur={handleBlur}
                    className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    disabled={showOTPFields}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>

                {!showOTPFields && (
                  <>
                    {loading && (
                      <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="magnifying-glass-loading"
                        glassColor="#c0efff"
                        color="#e15b64"
                      />
                    )}
                    {!loading && (
                      <button
                        type="button"
                        onClick={() => checkEmail(values)}
                        disabled={
                          !Yup.string().email().isValidSync(values.email)
                        }
                        className="w-full bg-blue-500 disabled:hover:bg-blue-500 disabled:opacity-60 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Send OTP
                      </button>
                    )}
                  </>
                )}

                {showOTPFields && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="otp" className="block text-gray-600">
                        OTP
                      </label>
                      <Field
                        type="text"
                        name="otp"
                        onBlur={handleBlur}
                        className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="otp"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="newPassword"
                        className="block text-gray-600"
                      >
                        New Password
                      </label>
                      <Field
                        type="password"
                        name="newPassword"
                        onBlur={handleBlur}
                        className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-gray-600"
                      >
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        onBlur={handleBlur}
                        className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>

                    {loading && (
                      <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="magnifying-glass-loading"
                        glassColor="#c0efff"
                        color="#e15b64"
                      />
                    )}

                    {!loading && (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Submit
                      </button>
                    )}
                  </>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
