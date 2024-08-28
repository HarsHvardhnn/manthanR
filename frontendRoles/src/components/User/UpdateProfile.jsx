import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import SubmitOTP from "../Auth/SubmitOtp";
import { userContext } from "../../context";
import Header from "../Home/Header";
import { toast } from "react-toastify";
import { BsPlusLg } from "react-icons/bs";

const ProfileUpdatePage = () => {
  const { user, setUser } = useContext(userContext);
  const [formValues, setFormvalues] = useState(null);
  const [otp, setOtp] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [adminAss, setAdminAss] = useState("");

  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    contactNumber: "",
    dateOfBirth: "",
    degreeType: "",
    department: "",
    semester: "",
    rollNumber: "",
    hostelName: "",
    hostelRoomNumber: "",
    relationshipStatus: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    gender: Yup.string().required("Gender is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be only digits and exactly 10 digits")
      .required("Contact Number is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
    degreeType: Yup.string().required("Degree Type is required"),
    department: Yup.string().required("Department is required"),
    semester: Yup.string().required("Semester is required"),
    rollNumber: Yup.string().required("Roll Number is required"),
    hostelName: Yup.string().required("Hostel Name is required"),
    hostelRoomNumber: Yup.string().required("Hostel Room Number is required"),
    relationshipStatus: Yup.string().required(
      "Relationship Status is required"
    ),
  });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const getAdmin = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://manthanr.onrender.com/v1/assigned-admin/${user.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //  console.log(res);
        setAdminAss(res.data);
        setUser({ ...user, assigned_admin: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (values) => {
    const token = localStorage.getItem("token");
    try {
      setIsUpdating(true);
      const idOfUser = user.userID;

      const formData = new FormData();
      formData.append("user", user.userID);
      formData.append("firstname", values.firstName);
      formData.append("lastname", values.lastName);
      formData.append("courseAndYear", values.courseAndYear);
      formData.append("rollNumber", values.rollNumber);
      formData.append("contactNumber", values.contactNumber);
      formData.append("hostelName", values.hostelName);
      formData.append("dateOfBirth", values.dateOfBirth);
      formData.append("relationshipStatus", values.relationshipStatus);
      formData.append("degree", values.degreeType);
      formData.append("dept", values.department);
      formData.append("semester", values.semester);
      formData.append("room", values.hostelRoomNumber);
      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(
        "https://manthanr.onrender.com/v1/update-profile",
        // 'http://localhost:3030/v1/update-profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.message === "Profile created successfully") {
        toast.success("Profile updated");
        setIsUpdating(false);

        const updatedUser = {
          ...user,
          username: values.username,
          email: values.email,
          assigned_admin: res.data.admintoupdate._id,
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        console.log(user);
      }
    } catch (err) {
      console.log(err);
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const storedUserData = localStorage.getItem("user");
    // console.log(storedUserData)
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUser(parsedUserData);
    }

    // getUserProfile();
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-svh sm:min-h-screen flex justify-center items-center font-montserrat pt-10 sm:pt-20 bg-blue-200">
        <div className="flex bg-white justify-center items-center w-11/12 md:w-3/4 lg:w-10/12 xl:w-3/5 rounded-xl">
          <div className="flex-1 bg-white py-4 px-2 sm:px-6 rounded-xl w-full sm:w-96">
            <h2 className="text-2xl text-center sm:text-3xl font-bold mb-6 ">
              Update Profile
            </h2>
            {otp ? (
              <SubmitOTP values={formValues} user={user} setUser={setUser} />
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnMount={true}
                onSubmit={onSubmit}
              >
                {({ values, errors, touched, isValid }) => (
                  <Form>
                    <div className="mb-4">
                      <div className="flex mb-2">
                        <div className="w-1/2 mr-2">
                          <Field
                            type="text"
                            name="firstName"
                            placeholder="First Name *"
                            className={`w-full px-4 py-2 border text-xs sm:text-sm xl:text-base rounded-md focus:outline-none ${
                              errors.firstName && touched.firstName
                                ? "border-red-500"
                                : " focus:border-blue-400 focus:border-2"
                            }`}
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-red-500 text-xs sm:text-sm"
                          />
                        </div>
                        <div className="w-1/2 ml-2">
                          <Field
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className={`w-full px-4 py-2 border text-xs sm:text-sm xl:text-base rounded-md focus:outline-none ${
                              errors.lastName && touched.lastName
                                ? "border-red-500"
                                : " focus:border-blue-400 focus:border-2"
                            }`}
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <Field
                        as="select"
                        name="gender"
                        className={`w-full px-4 py-2 bg-white text-xs sm:text-sm xl:text-base border rounded-md focus:outline-none ${
                          errors.gender && touched.gender
                            ? "border-red-500"
                            : " focus:border-blue-400 focus:border-2"
                        } ${!values.gender ? "text-gray-400" : "text-black"}`}
                      >
                        <option value="" disabled>
                          Select Gender *
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-500 text-xs sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex">
                        <div className="w-1/2 mr-2 relative">
                          <Field
                            type="date"
                            name="dateOfBirth"
                            placeholder="Date of Birth *"
                            className={` w-full px-4 py-2 text-xs sm:text-sm xl:text-base bg-white border rounded-md focus:outline-none ${
                              errors.dateOfBirth && touched.dateOfBirth
                                ? "border-red-500"
                                : " focus:border-blue-400 focus:border-2"
                            } ${
                              !values.dateOfBirth
                                ? "text-gray-400"
                                : "text-black"
                            }`}
                          />
                          {!values.dateOfBirth && (
                            <>
                              <span className="sm:hidden absolute text-gray-400 text-xs md:text-base left-4 top-2.5">
                                Date of Birth
                              </span>
                              <span className="absolute text-gray-400 text-xs md:text-base left-24 sm:left-32 top-2">
                                *
                              </span>
                            </>
                          )}
                          <ErrorMessage
                            name="dateOfBirth"
                            component="div"
                            className="text-red-500 text-xs sm:text-sm"
                          />
                        </div>
                        <div className="w-1/2 ml-2">
                          <Field
                            type="tel"
                            name="contactNumber"
                            placeholder="Contact Number *"
                            className={`w-full px-4 py-2 text-xs sm:text-sm xl:text-base border rounded-md focus:outline-none ${
                              errors.contactNumber && touched.contactNumber
                                ? "border-red-500"
                                : " focus:border-blue-400 focus:border-2"
                            }`}
                          />
                          <ErrorMessage
                            name="contactNumber"
                            component="div"
                            className="text-red-500 text-xs sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <div className="w-1/3 mr-2">
                        <Field
                          as="select"
                          name="degreeType"
                          className={`w-full px-4 py-2 text-xs sm:text-sm xl:text-base bg-white border rounded-md focus:outline-none ${
                            errors.degreeType && touched.degreeType
                              ? "border-red-500"
                              : " focus:border-blue-400 focus:border-2"
                          } ${
                            !values.degreeType ? "text-gray-400" : "text-black"
                          }`}
                        >
                          <option value="" disabled>
                            Select Degree Type *
                          </option>
                          <option value="undergrad">Undergraduate</option>
                          <option value="postgrad">Postgraduate</option>
                          <option value="PhD">PhD</option>
                        </Field>
                        <ErrorMessage
                          name="degreeType"
                          component="div"
                          className="text-red-500 text-xs sm:text-sm"
                        />
                      </div>

                      <div className="w-1/3 mx-1">
                        <Field
                          as="select"
                          name="department"
                          className={`w-full px-4 py-2 text-xs sm:text-sm xl:text-base bg-white border rounded-md focus:outline-none ${
                            errors.department && touched.department
                              ? "border-red-500"
                              : "focus:border-blue-400 focus:border-2"
                          } ${
                            !values.department ? "text-gray-400" : "text-black"
                          }`}
                        >
                          <option value="" disabled>
                            Select Department *
                          </option>
                          <option value="cbe">CBE</option>
                          <option value="cee">CEE</option>
                          <option value="chem">CHEM</option>
                          <option value="cse">CSE</option>
                          <option value="ee">EE</option>
                          <option value="hss">HSS</option>
                          <option value="math">MATH</option>
                          <option value="me">ME</option>
                          <option value="mee">MEE</option>
                          <option value="phy">PHY</option>
                        </Field>
                        <ErrorMessage
                          name="department"
                          component="div"
                          className="text-red-500 text-xs sm:text-sm"
                        />
                      </div>
                      <div className="w-1/3 ml-2">
                        <Field
                          as="select"
                          name="semester"
                          className={`w-full px-4 py-2 text-xs sm:text-sm xl:text-base bg-white border rounded-md focus:outline-none ${
                            errors.semester && touched.semester
                              ? "border-red-500"
                              : " focus:border-blue-400 focus:border-2"
                          } ${
                            !values.semester ? "text-gray-400" : "text-black"
                          }`}
                        >
                          <option value="" disabled>
                            Select Semester *
                          </option>
                          <option value="1">Sem 1</option>
                          <option value="2">Sem 2</option>
                          <option value="3">Sem 3</option>
                          <option value="4">Sem 4</option>
                          <option value="5">Sem 5</option>
                          <option value="6">Sem 6</option>
                          <option value="7">Sem 7</option>
                          <option value="8">Sem 8</option>
                          <option value="9">Sem 9</option>
                          <option value="10">Sem 10</option>
                        </Field>
                        <ErrorMessage
                          name="semester"
                          component="div"
                          className="text-red-500 text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Field
                        type="text"
                        name="rollNumber"
                        placeholder="Roll Number *"
                        className={`w-full px-4 py-2 text-xs sm:text-sm xl:text-base border rounded-md focus:outline-none ${
                          errors.rollNumber && touched.rollNumber
                            ? "border-red-500"
                            : " focus:border-blue-400 focus:border-2"
                        } `}
                      />
                      <ErrorMessage
                        name="rollNumber"
                        component="div"
                        className="text-red-500 text-xs sm:text-sm"
                      />
                    </div>

                    <div className="mb-4 flex items-center">
                      <div className="w-1/2 mr-2">
                        <Field
                          as="select"
                          name="hostelName"
                          className={`w-full px-4 py-2 text-xs sm:text-sm xl:text-base bg-white border rounded-md focus:outline-none ${
                            errors.hostelName && touched.hostelName
                              ? "border-red-500"
                              : " focus:border-blue-400 focus:border-2"
                          } ${
                            !values.hostelName ? "text-gray-400" : "text-black"
                          }`}
                        >
                          <option value="" disabled>
                            Select Hostel *
                          </option>
                          <option value="APJ Kalam Hostel">APJ Kalam</option>
                          <option value="Asima Hostel">Asima</option>
                          <option value="AryaBhatt Hostel">AryaBhatt</option>
                          <option value="CV Raman Hostel">CV Raman</option>
                          {/* Add more hostels as needed */}
                        </Field>
                        <ErrorMessage
                          name="hostelName"
                          component="div"
                          className="text-red-500 text-xs sm:text-sm"
                        />
                      </div>
                      <div className="w-1/2 ml-2">
                        <Field
                          type="text"
                          name="hostelRoomNumber"
                          placeholder="Room Number *"
                          className={`w-full px-4 py-2 text-xs sm:text-sm xl:text-base border rounded-md focus:outline-none ${
                            errors.hostelRoomNumber && touched.hostelRoomNumber
                              ? "border-red-500"
                              : " focus:border-blue-400 focus:border-2"
                          }`}
                        />
                        <ErrorMessage
                          name="hostelRoomNumber"
                          component="div"
                          className="text-red-500 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <Field
                        as="select"
                        name="relationshipStatus"
                        className={`w-full px-4 py-2 text-xs sm:text-sm xl:text-base bg-white
                                border rounded-md focus:outline-none ${
                                  errors.relationshipStatus &&
                                  touched.relationshipStatus
                                    ? "border-red-500"
                                    : " focus:border-blue-400 focus:border-2"
                                } ${
                          !values.relationshipStatus
                            ? "text-gray-400"
                            : "text-black"
                        }`}
                      >
                        <option className="" value="" disabled>
                          Select Relationship Status *
                        </option>
                        <option className="" value="Single">
                          Single
                        </option>

                        <option className="" value="In a Relationship">
                          In a Relationship
                        </option>
                        <option className="" value="Focused on Self-Growth">
                          Focused on Self-Growth
                        </option>
                      </Field>
                      <ErrorMessage
                        name="relationshipStatus"
                        component="div"
                        className="text-red-500 text-xs sm:text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-600 text-xs sm:text-sm xl:text-base font-semibold mb-2">
                        Upload your Profile Picture
                      </p>

                      <label className="relative overflow-hidden w-full rounded-lg cursor-pointer">
                        <input
                          type="file"
                          className="w-full px-4 py-2 text-xs sm:text-sm xl:text-base border rounded-md focus:outline-none"
                          accept="image/*"
                          onChange={uploadImage}
                        />
                      </label>
                    </div>

                    <Link
                      to="/usersection"
                      className={`w-full text-center bg-blue-500 text-white tex-lg font-semibold shadow-md py-3 px-8 rounded-md mt-2 hover:bg-blue-600 transition duration-300 ${
                        !isValid || isUpdating
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
                      onClick={() => {
                        // console.log(values);
                        onSubmit(values);
                        localStorage.setItem(
                          "isProfileComplete",
                          JSON.stringify(true)
                        ); 
                      }}
                      style={{ display: "block", margin: "auto" }}
                    >
                      {isUpdating ? "Updating..." : "Update Profile"}
                    </Link>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdatePage;
