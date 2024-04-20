import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddAdmin = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    degreeType: "",
    department: "",
    yearOfCourse: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    degreeType: Yup.string().required("Degree Type is required"),
    department: Yup.string().required("Department is required"),
    yearOfCourse: Yup.string().required("Year of Course is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    const password = generateRandomPassword();
    const formData = {
      ...values,
      password: password,
    };

    // Send formData to backend
    console.log(formData);

    resetForm();
  };

  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&_+";

    let password = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }

    return password;
  };

  return (
    <div className="w-full bg-gray-100 overflow-y-auto h-[90%]">
      <div className="w-3/4 mx-auto bg-white rounded p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add Admin</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex justify-between w-full">
                <div className="mb-4 mr-2 w-1/2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4 w-1/2 ml-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="degreeType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Degree Type
                </label>
                <Field
                  as="select"
                  id="degreeType"
                  name="degreeType"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Degree Type</option>
                  <option value="postgrad">PG</option>
                  <option value="undergrad">UG</option>
                  <option value="PhD">PHD</option>
                </Field>
                <ErrorMessage
                  name="degreeType"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <Field
                  as="select"
                  id="department"
                  name="department"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Department</option>
                  <option value="cse">CSE</option>
                  <option value="me">ME</option>
                  <option value="ee">EE</option>
                  <option value="mee">MEE</option>
                  <option value="hss">HSS</option>
                  <option value="math">MATH</option>
                  <option value="phy">PHY</option>
                  <option value="chem">CHEM</option>
                </Field>
                <ErrorMessage
                  name="department"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="yearOfCourse"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year of Course
                </label>
                <Field
                  as="select"
                  id="yearOfCourse"
                  name="yearOfCourse"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Year of Course</option>
                  {[...Array(10)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="yearOfCourse"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
                disabled={isSubmitting}
              >
                Add Admin
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddAdmin;
