import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import SubmitOTP from "../Auth/SubmitOtp";
import { userContext } from "../../context";
import Header from "../Home/Header";
import { toast } from "react-toastify";

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
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First Name can only contain letters, no spaces")
      .max(50, "First Name cannot be longer than 50 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters")
      .max(50, "First Name cannot be longer than 50 characters"),
    gender: Yup.string().required("Gender is required"),
    contactNumber: Yup.string()
      .matches(
        /^[1-9][0-9]{9}$/,
        "Must be exactly 10 digits and cannot start with 0"
      )
      .required("Contact Number is required"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of Birth cannot be in the future")
      .min(
        new Date(new Date().setFullYear(new Date().getFullYear() - 100)),
        "Date of Birth is too far in the past"
      )
      .required("Date of Birth is required"),
    degreeType: Yup.string().required("Degree Type is required"),
    department: Yup.string().required("Department is required"),
    semester: Yup.string().required("Semester is required"),
    rollNumber: Yup.string()
      .matches(/^[a-zA-Z0-9-_/\\]{1,20}$/, "Please enter a valid roll number.")
      .required("Roll Number is required"),
    hostelName: Yup.string().required("Hostel Name is required"),
    hostelRoomNumber: Yup.string()
      .matches(/^[a-zA-Z0-9-_/\\]{1,10}$/, "Please enter a valid room number.")
      .required("Hostel Room Number is required"),
    relationshipStatus: Yup.string().required(
      "Relationship Status is required"
    ),
  });
  
  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 750 * 1024) {
        toast.error("File size exceeds 750 KB. Please upload a smaller image.");
        e.target.value = null;
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
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
      console.log("updated", res);
      if (res.data.message === "Profile created successfully") {
        toast.success("Profile updated");
        setIsUpdating(false);
        console.log("values", values);
        const updatedUser = {
          ...user,
          username: values.firstName,
          email: values.email,
          // assigned_admin: res.data.admintoupdate._id,
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        //console.log(user);
      }
    } catch (err) {
      console.log("err", err);
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
                              {/* <span className="sm:hidden absolute text-gray-400 text-xs md:text-base left-4 top-2.5">
                                Date of Birth
                              </span> */}
                              <span className="absolute text-gray-400 text-xs md:text-base left-[104px] sm:left-32 top-2">
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
                          <option value="AI">AI</option>
                          <option value="AI&DS">AI&DS</option>
                          <option value="AMT">
                            Advance Manufacturing technology
                          </option>
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
                          <option value="ECE">ECE</option>
                          <option value="EEE">EEE</option>
                          <option value="Geo">GEO</option>
                          <option value="HSS">HSS</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Math">MATH</option>
                          <option value="Mechanical Design">
                            Mechanical Design
                          </option>
                          <option value="ME">ME</option>
                          <option value="MME">MME</option>
                          <option value="Mechatronics">Mechatronics</option>
                          <option value="P&C">P&C</option>
                          <option value="PHY">PHY</option>
                          <option value="Structural ">Structural</option>
                          <option value="TFE">
                            Thermal & Fluids Engineering
                          </option>
                          <option value="Thermal">Thermal</option>
                          <option value="VLSI">VLSI</option>
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
                        Upload your Profile Picture (Max size: 750 KB){" "}
                        <a
                          href="https://image.pi7.org/reduce-image-size-in-kb"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline text-xs font-medium"
                        >
                          Compress Image
                        </a>
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
