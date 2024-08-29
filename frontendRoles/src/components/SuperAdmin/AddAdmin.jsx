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
    degree: "",
    dept: "",
    semester: [],
    password: "",
  };
  const [selectedSemesters, setSelectedSemesters] = useState([]);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    phone: Yup.string().min(10).max(10).required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    degree: Yup.string().required("Degree Type is required"),
    dept: Yup.string().required("Department is required"),
    semester: Yup.array()
      .min(1, "At least one semester must be selected")
      .required("Semester is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    const password = generateRandomPassword();
    const formData = {
      ...values,
      semester: selectedSemesters,
      password: password,
    };
    // console.log("Generated Password:", password);
    const token = localStorage.getItem("superadminToken");
    // console.log(formData);

    axios
      .post("https://manthanr.onrender.com/v1/create-admin", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log(res);
        toast.success("New admin created successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    // Send formData to backend
    resetForm();
    setSelectedSemesters([]);
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

  const handleSemesterClick = (semester, setFieldValue) => {
  const updatedSemesters = selectedSemesters.includes(semester)
    ? selectedSemesters.filter((s) => s !== semester)
    : [...selectedSemesters, semester];

  setSelectedSemesters(updatedSemesters);
  setFieldValue("semester", updatedSemesters);
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
                <Field
                  as="select"
                  id="degree"
                  name="degree"
                  className="mt-1 p-2 bg-white shadow text-xs sm:text-sm xl:text-base block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select Degree Type
                  </option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="PhD">PhD</option>
                  <option value="Integrated (B.Tech-M.Tech)">
                    Integrated (B.Tech-M.Tech)
                  </option>
                  <option value="Integrated (B.Tech-MBA)">
                    Integrated (B.Tech-MBA)
                  </option>
                </Field>
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
                <Field
                  as="select"
                  id="dept"
                  name="dept"
                  className="mt-1 p-2 bg-white shadow text-xs sm:text-sm xl:text-base block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select Dept.
                  </option>
                  <option value="AI">AI</option>
                  <option value="AI&DS">AI&DS</option>
                  <option value="AMT">Advance Manufacturing technology</option>
                  <option value="CBE">CBE</option>
                  <option value="CEE">CEE</option>
                  <option value="CHEM">CHEM</option>
                  <option value="CSE">CSE</option>
                  <option value="CSSP">CSSP</option>
                  <option value="Design">Design</option>
                  <option value="ECE-VLSI">ECE-VLSI</option>
                  <option value="ECE-CSSP">ECE-CSSP</option>
                  <option value="EEE-P&C">EEE-P&C</option>
                  <option value="ECE+CSSP">ECE+CSSP</option>
                  <option value="EE">EE</option>
                  <option value="EEE">EEE</option>
                  <option value="Geo">GEO</option>
                  <option value="HSS">HSS</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Math">MATH</option>
                  <option value="Mechanical Design">Mechanical Design</option>
                  <option value="ME">ME</option>
                  <option value="MEE">MEE</option>
                  <option value="Mechatronics">Mechatronics</option>
                  <option value="P&C">P&C</option>
                  <option value="PHY">PHY</option>
                  <option value="Structural ">Structural</option>
                  <option value="TFE">Thermal & Fluids Engineering</option>
                  <option value="Thermal">Thermal</option>
                  <option value="VLSI">VLSI</option>
                </Field>
                <ErrorMessage
                  name="dept"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="semester"
                  className="block font-semibold text-gray-700"
                >
                  Semester
                </label>
                <div className="flex flex-wrap gap-2">
                  {[...Array(10)].map((_, index) => {
                    const semester = index + 1;
                    const isSelected = selectedSemesters.includes(semester);

                    return (
                      <button
                        type="button"
                        key={semester}
                        className={`py-1 px-4 text-xs sm:text-sm font-medium rounded-md border ${
                          isSelected
                            ? "bg-blue-500 bg-opacity-95 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                        onClick={() => handleSemesterClick(semester, setFieldValue)}
                      >
                        Sem {semester}
                      </button>
                    );
                  })}
                </div>

                <ErrorMessage
                  name="semester"
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
