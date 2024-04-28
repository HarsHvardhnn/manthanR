import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userContext } from "../../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(userContext);
  const initialValues = {
    phoneNumber: "",
    hostelName: "",
    hostelRoomNumber: "",
    relationshipStatus: "",
    semester: "",
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Phone Number is required"),
    hostelName: Yup.string().required("Hostel Name is required"),
    hostelRoomNumber: Yup.string().required("Hostel Room Number is required"),
    relationshipStatus: Yup.string().required(
      "Relationship Status is required"
    ),
    semester: Yup.string().required("Semester is required"),
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

  const hostelOptions = [
    { label: "Select Hostel", value: "" },
    { label: "APJ Kalam Hostel", value: "APJ Kalam Hostel" },
    { label: "Asima Hostel", value: "Asima Hostel" },
    { label: "AryaBhatt Hostel", value: "AryaBhatt Hostel" },
    { label: "CV Raman Hostel", value: "CV Raman Hostel" },
  ];

  const relationshipStatusOptions = [
    { label: "Select Relationship Status", value: "" },
    { label: "Single", value: "Single" },
    { label: "In a Relationship", value: "In a Relationship" },
    { label: "It's Complicated", value: "It's Complicated" },
    { label: "Friendzoned", value: "Friendzoned" },
    { label: "Building My Empire", value: "Building My Empire" },
    { label: "Focused on Self-Growth", value: "Focused on Self-Growth" },
  ];

  const semesterOptions = [
    { label: "Select Semester", value: "" },
    { label: "Sem 1", value: "Sem 1" },
    { label: "Sem 2", value: "Sem 2" },
    { label: "Sem 3", value: "Sem 3" },
    { label: "Sem 4", value: "Sem 4" },
    { label: "Sem 5", value: "Sem 5" },
    { label: "Sem 6", value: "Sem 6" },
    { label: "Sem 7", value: "Sem 7" },
    { label: "Sem 8", value: "Sem 8" },
    { label: "Sem 9", value: "Sem 9" },
    { label: "Sem 10", value: "Sem 10" },
  ];

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("user", user.userID);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("hostelName", values.hostelName);
    formData.append("hostelRoomNumber", values.hostelRoomNumber);
    formData.append("relationshipStatus", values.relationshipStatus);
    formData.append("semester", values.semester);
    if (image) {
      formData.append("image", image);
    }

    const token = localStorage.getItem("token");
    axios
      .post(
        // "http://localhost:3030/v1/edit-profile",
        "https://manthanr.onrender.com/v1/edit-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.message === "Profile updated successfully") {
          toast.success("profile updated");
          navigate("/usersection");
        }
      })
      .catch((err) => {
        toast.error("some error occured");
      });
  };

  return (
    <div className="w-full bg-blue-200 min-h-screen ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isValid }) => (
          <Form className="w-[40%] mx-auto relative top-28 font-montserrat shadow-xl p-6 rounded-xl bg-white">
            <div>
              <h1 className="uppercase font-bold text-xl mb-4 underline">
                Edit Profile
              </h1>
            </div>
            
            <div className="mb-4">
              <Field
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <Field
                as="select"
                name="hostelName"
                className="w-full px-3 py-2 border rounded-md"
              >
                {hostelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="hostelName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="hostelRoomNumber"
                placeholder="Hostel Room Number"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="hostelRoomNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <Field
                as="select"
                name="relationshipStatus"
                className="w-full px-3 py-2 border rounded-md"
              >
                {relationshipStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="relationshipStatus"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <Field
                as="select"
                name="semester"
                className="w-full px-3 py-2 border rounded-md"
              >
                {semesterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="semester"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                type="file"
                onChange={uploadImage}
                accept="image/*"
                className="mb-2"
              />
              {image && (
                <img
                  src={image}
                  alt="Selected"
                  className="max-h-60 max-w-40 rounded-md"
                />
              )}
            </div>
            <button
              type="submit"
              className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ${
                isSubmitting || !isValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfileForm;
