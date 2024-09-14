import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const AddWarden = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    hostelName: "",
    password: "",
    role: "warden"
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    phone: Yup.string().min(10).max(10).required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    hostel: Yup.string().required("Hostel is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    const formData = {
      ...values,
      password: values.phone,
    };
    const token = localStorage.getItem("superadminToken");
    console.log(formData);

    axios
      .post("https://manthanr.onrender.com/v1/create-admin", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("New Warden created successfully");
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });

    resetForm();
  };

  return (
    <div className="w-full bg-gray-100 overflow-y-auto h-[90%]">
      <div className="sm:w-3/4 md:w-11/12 lg:w-3/4 mx-auto bg-white rounded p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 uppercase ">
          Add Warden
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid, setFieldValue }) => (
            <Form>
              <div className="flex justify-between w-full">
                <div className="mb-4 mr-2 w-1/2">
                  <label
                    htmlFor="firstname"
                    className="block font-semibold text-gray-700"
                  >
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="mt-1 p-2 text-xs sm:text-sm xl:text-base shadow block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4 w-1/2 ml-2">
                  <label
                    htmlFor="lastname"
                    className="block font-semibold text-gray-700"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="mt-1 p-2 text-xs sm:text-sm xl:text-base shadow block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block font-semibold text-gray-700"
                >
                  Phone Number
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  className="mt-1 p-2 text-xs sm:text-sm xl:text-base shadow block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-semibold text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 text-xs sm:text-sm xl:text-base shadow block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="hostel"
                  className="block font-semibold text-gray-700 "
                >
                  Hostel
                </label>
                <Field
                  as="select"
                  id="hostelName"
                  name="hostelName"
                  className="mt-1 p-2 bg-white shadow text-xs sm:text-sm xl:text-base block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select Hostel
                  </option>
                  <option value="APJ Kalam Hostel">APJ Kalam</option>
                  <option value="Asima Hostel">Asima</option>
                  <option value="AryaBhatt Hostel">AryaBhatta</option>
                  <option value="AryaBhatt Hostel Girls">
                    AryaBhatta (Girls)
                  </option>
                  <option value="CV Raman Hostel">CV Raman</option>
                  <option value="Married">Married</option>
                </Field>
                <ErrorMessage
                  name="hostelName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer"
                disabled={!isValid || isSubmitting}
              >
                Add Warden
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddWarden;
