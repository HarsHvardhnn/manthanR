import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [showOTPFields, setShowOTPFields] = useState(false);
  const [wrongOtp, setWrongOtp] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  };

  const sendOtp = (values) => {
    console.log(values.email);
    axios.post('https://manthanr.onrender.com/v1/sendOtp', { email: values.email }).then((res) => {
      if (res.status === 200) {
        toast.success('OTP sent. Please enter it.');
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    otp: Yup.string().matches(/^\d{6}$/, 'OTP must be 6 digits').required('OTP is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  const onSubmit = (values, { setSubmitting }) => {
    axios.post('https://manthanr.onrender.com/v1/reset-password', {
      otpBody: values.otp,
      email: values.email,
      password: values.newPassword
    }).then((res) => {
 
      if (res.status === 200) {
        axios.delete('https://manthanr.onrender.com/v1/clear').then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
        toast.success('Password changed successfully.');
        navigate('/login');
      }
    }).catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        setWrongOtp(true);
        toast.error('Wrong OTP. Please try again.');
        return;
      }
    });
    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>
      {wrongOtp && <p className="text-red-500 mt-1">Wrong OTP. Please retry.</p>}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, touched, handleBlur }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <Field type="email" name="email" onBlur={handleBlur} className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500" disabled={showOTPFields} />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>
            {!showOTPFields && (
              <button type="button" onClick={(values) => {
                sendOtp(values);
                setShowOTPFields(true);
              }} className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Send OTP
              </button>
            )}
            {showOTPFields && (
              <>
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-gray-600">OTP</label>
                  <Field type="text" name="otp" onBlur={handleBlur} className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500" />
                  <ErrorMessage name="otp" component="div" className="text-red-500 mt-1" />
                </div>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-gray-600">New Password</label>
                  <Field type="password" name="newPassword" onBlur={handleBlur} className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500" />
                  <ErrorMessage name="newPassword" component="div" className="text-red-500 mt-1" />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-gray-600">Confirm Password</label>
                  <Field type="password" name="confirmPassword" onBlur={handleBlur} className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 mt-1" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Submit
                </button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;