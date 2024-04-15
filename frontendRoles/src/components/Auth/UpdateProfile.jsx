import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import bgImage from "./signupimg.jpg";
import SubmitOTP from "./SubmitOtp";
import { userContext } from "../../context";

const ProfileUpdatePage = () => {
  const { user, setUser } = useContext(userContext);
  const [formValues, setFormvalues] = useState(null);
  const [otp, setOtp] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // State to track whether update is in progress

  const initialValues = {
    fullName: user.fullName || "",
    courseAndYear: "",
    rollNumber: "",
    contactNumber: "",
    hostelName: "",
    dateOfBirth: "",
    relationshipStatus: "",
  };

  // const updateProfile = async (values) => {
  //   try {
  //     setIsUpdating(true); // Update is in progress, set loading state
  //     const res = await axios.post("https://manthanr.onrender.com/v1/update-profile", {
  //       user: user,
  //       fullName: values.fullName,
  //       courseAndYear: values.courseAndYear,
  //       rollNumber: values.rollNumber,
  //       contactNumber: values.contactNumber,
  //       hostelName: values.hostelName,
  //       dateOfBirth: values.dateOfBirth,
  //       relationshipStatus: values.relationshipStatus
  //     });
  //     console.log(res.data);
  //     setIsUpdating(false); // Update finished, reset loading state
  //   } catch (err) {
  //     console.log(err);
  //     setIsUpdating(false); // Update failed, reset loading state
  //   }
  // };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    courseAndYear: Yup.string().required("Course and Year is required"),
    rollNumber: Yup.string().required("Roll Number is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Contact Number is required"),
    hostelName: Yup.string().required("Hostel Name is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
    date: Yup.string().required("Date is required"),
    relationshipStatus: Yup.string().required(
      "Relationship Status is required"
    ),
  });

  const onSubmit = async (values) => {
    console.log(values);
    try {
      setIsUpdating(true); // Set loading state
      const res = await axios.post("https://manthanr.onrender.com/v1/update-profile", {
        user: user,
        fullName: values.fullName,
        courseAndYear: values.courseAndYear,
        rollNumber: values.rollNumber,
        contactNumber: values.contactNumber,
        hostelName: values.hostelName,
        dateOfBirth: values.dateOfBirth,
        relationshipStatus: values.relationshipStatus,
      });
      console.log(res.data);
      setIsUpdating(false); // Reset loading state
      // Optionally reset the form after successful submission
    } catch (err) {
      console.log(err);
      setIsUpdating(false); // Reset loading state even if update fails
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-200 font-montserrat">
      <div className="flex bg-white justify-center items-center w-11/12 sm:w-3/5 shadow-xl rounded-xl">
        <div className="flex-1 bg-white py-4 px-6 rounded-xl w-full sm:w-96">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 uppercase">
            Update Profile
          </h2>
          {otp ? (
            <SubmitOTP values={formValues} user={user} setUser={setUser} />
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, errors, touched }) => (
                <Form>
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      className={`w-full px-2.5 py-1.5 border text-sm sm:text-base rounded-md focus:outline-none ${
                        errors.fullName && touched.fullName
                          ? "border-red-500"
                          : " focus:border-black"
                      }`}
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="courseAndYear"
                      placeholder="Course and Year"
                      className={`w-full px-2.5 py-1.5 text-sm sm:text-base border rounded-md focus:outline-none ${
                        errors.courseAndYear && touched.courseAndYear
                          ? "border-red-500"
                          : " focus:border-black"
                      }`}
                    />
                    <ErrorMessage
                      name="courseAndYear"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="rollNumber"
                      placeholder="Roll Number"
                      className={`w-full px-2.5 py-1.5 text-sm sm:text-base border rounded-md focus:outline-none ${
                        errors.rollNumber && touched.rollNumber
                          ? "border-red-500"
                          : " focus:border-black"
                      }`}
                    />
                    <ErrorMessage
                      name="rollNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type="tel"
                      name="contactNumber"
                      placeholder="Contact Number"
                      className={`w-full px-2.5 py-1.5 text-sm sm:text-base border rounded-md focus:outline-none ${
                        errors.contactNumber && touched.contactNumber
                          ? "border-red-500"
                          : " focus:border-black"
                      }`}
                    />
                    <ErrorMessage
                      name="contactNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      as="select"
                      // type="select"
                      name="hostelName"
                      placeholder="Hostel Name"
                      className={`w-full px-2.5 py-1.5 text-xs sm:text-sm xl:text-base border rounded-md focus:outline-none ${
                        errors.hostelName && touched.hostelName
                          ? "border-red-500"
                          : " focus:border-black"
                      }`}
                    >
                      <option value="">Select Hostel</option>
                      <option value="APJ Kalam Hostel">APJ Kalam</option>
                      <option value="Asima Hostel">Asima</option>
                      <option value="AryaBhatt Hostel">AryaBhatt</option>
                      <option value="CV Raman Hostel">CV Raman</option>
                    </Field>
                    <ErrorMessage
                      name="hostelName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type="date"
                      name="dateOfBirth"
                      placeholder="Date of Birth"
                      className={`w-full px-2.5 py-1.5 text-sm sm:text-base border rounded-md focus:outline-none ${
                        errors.dateOfBirth && touched.dateOfBirth
                          ? "border-red-500"
                          : " focus:border-black"
                      }`}
                    />
                    <ErrorMessage
                      name="dateOfBirth"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      as="select"
                      name="relationshipStatus"
                      className={`w-full px-2.5 py-1.5 text-xs sm:text-sm xl:text-base
                                border rounded-md focus:outline-none ${
                                  errors.relationshipStatus &&
                                  touched.relationshipStatus
                                    ? "border-red-500"
                                    : " focus:border-black"
                                }`}
                    >
                      <option className="" value="">
                        Select Relationship Status
                      </option>
                      <option className="" value="Single">
                        Single
                      </option>
                      <option className="" value="Happily Single">
                        Happily Single
                      </option>
                      <option className="" value="In a Relationship">
                        In a Relationship
                      </option>
                      <option className="" value="It's Complicated">
                        It's Complicated
                      </option>
                      <option className="" value="Friendzoned">
                        Friendzoned
                      </option>
                      <option className="" value="Building My Empire">
                        Building My Empire
                      </option>
                      <option className="" value="Focused on Self-Growth">
                        Focused on Self-Growth
                      </option>
                    </Field>
                    <ErrorMessage
                      name="relationshipStatus"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <Link
                    to="/Disclaimer"
                    className={`w-full text-center bg-blue-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105 ${
                      isUpdating ? "pointer-events-none opacity-50" : ""
                    }`}
                    onClick={() => {
                      console.log(values);
                      onSubmit(values);
                    }}
                    style={{ display: "block", margin: "auto" }}
                  >
                    {isUpdating ? "Updating..." : "Update Profile"}
                  </Link>
                  <Link
                    to="/update-password"
                    className="block mt-2 text-blue-500 w-fit mx-auto hover:underline"
                  >
                    Update Password
                  </Link>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
