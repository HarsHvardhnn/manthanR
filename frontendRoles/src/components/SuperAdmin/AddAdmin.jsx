import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const AddAdmin = () => {

  const initialValues = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    degrees: [],
    depts: [],
    semesters: [],
    password: "",
    role: "admin",
  };
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [selectedDegrees, setSelectedDegrees] = useState([]);
  const [selectedDepts, setSelectedDepts] = useState([]);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    phone: Yup.string().min(10).max(10).required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    degrees: Yup.array()
      .min(1, "At least one degree must be selected")
      .required("Degrees are required"),
    depts: Yup.array()
      .min(1, "At least one department must be selected")
      .required("Departments are required"),
    semesters: Yup.array()
      .min(1, "At least one semester must be selected")
      .required("Semesters are required"),
  });

  const onSubmit = (values, { resetForm }) => {
    const password = generateRandomPassword();
    const formData = {
      ...values,
      degrees: selectedDegrees,
      depts: selectedDepts,
      semesters: selectedSemesters,
      password: values.phone,
    };
    const token = localStorage.getItem("superadminToken");
    // console.log(formData);
    const apiUrl = process.env.REACT_APP_API_URL;


    axios
      .post(`${apiUrl}/create-admin`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("New admin created successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    resetForm();
    setSelectedSemesters([]);
    setSelectedDegrees([]);
    setSelectedDepts([]);
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

  const handleSelectionClick = (
    item,
    selectedItems,
    setSelectedItems,
    setFieldValue,
    fieldName
  ) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((s) => s !== item)
      : [...selectedItems, item];

    setSelectedItems(updatedItems);
    setFieldValue(fieldName, updatedItems);
  };

  return (
    <div className="w-full bg-gray-100 overflow-y-auto h-[90%]">
      <div className="sm:w-3/4 md:w-11/12 lg:w-3/4 mx-auto bg-white rounded p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 uppercase ">
          Add Admin
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
                  htmlFor="degree"
                  className="block font-semibold text-gray-700 "
                >
                  Degree Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "B.Tech",
                    "M.Tech",
                    "M.Sc",
                    "PhD",
                    "Integrated (B.Tech-M.Tech)",
                    "Integrated (B.Tech-MBA)",
                  ].map((degree) => (
                    <button
                      type="button"
                      key={degree}
                      className={`py-1 px-4 text-xs sm:text-sm font-medium rounded-md border ${
                        selectedDegrees.includes(degree)
                          ? "bg-blue-500 bg-opacity-95 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                      onClick={() =>
                        handleSelectionClick(
                          degree,
                          selectedDegrees,
                          setSelectedDegrees,
                          setFieldValue,
                          "degrees"
                        )
                      }
                    >
                      {degree}
                    </button>
                  ))}
                </div>
                <ErrorMessage
                  name="degree"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dept"
                  className="block font-semibold text-gray-700"
                >
                  Department
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AI",
                    "AI&DS",
                    "Advance Manufacturing technology",
                    "CBE",
                    "CEE",
                    "CHEM",
                    "CSE",
                    "CSSP",
                    "Design",
                    "ECE-VLSI",
                    "ECE-CSSP",
                    "EEE-P&C",
                    "ECE+CSSP",
                    "EE",
                    "ECE",
                    "EEE",
                    "GEO",
                    "HSS",
                    "Manufacturing",
                    "Math",
                    "Mechanical Design",
                    "ME",
                    "MME",
                    "Mechatronics",
                    "P&C",
                    "PHY",
                    "Structural",
                    "Thermal & Fluids Engineering",
                    "Thermal",
                    "VLSI",
                  ].map((dept) => (
                    <button
                      type="button"
                      key={dept}
                      className={`py-1 px-4 text-xs sm:text-sm font-medium rounded-md border ${
                        selectedDepts.includes(dept)
                          ? "bg-blue-500 bg-opacity-95 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                      onClick={() =>
                        handleSelectionClick(
                          dept,
                          selectedDepts,
                          setSelectedDepts,
                          setFieldValue,
                          "depts"
                        )
                      }
                    >
                      {dept}
                    </button>
                  ))}
                </div>
                <ErrorMessage
                  name="dept"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="semesters"
                  className="block font-semibold text-gray-700"
                >
                  Semesters
                </label>
                <div className="flex flex-wrap gap-2">
                  {[...Array(10)].map((_, index) => {
                    const semester = index + 1;
                    const isSelected = selectedSemesters.includes(
                      semester.toString()
                    );

                    return (
                      <button
                        type="button"
                        key={semester}
                        className={`py-1 px-4 text-xs sm:text-sm font-medium rounded-md border ${
                          isSelected
                            ? "bg-blue-500 bg-opacity-95 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                        onClick={() =>
                          handleSelectionClick(
                            semester.toString(),
                            selectedSemesters,
                            setSelectedSemesters,
                            setFieldValue,
                            "semesters"
                          )
                        }
                      >
                        Sem {semester}
                      </button>
                    );
                  })}
                </div>

                <ErrorMessage
                  name="semesters"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer"
                disabled={!isValid || isSubmitting}
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
