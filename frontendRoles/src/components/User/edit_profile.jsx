import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userContext } from "../../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Header";
import DialogModal from "../Admin/DialogModal";

const EditProfileForm = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, setUser } = useContext(userContext);
  const [obj, setObj] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [currentSem, setCurrentSem] = useState(null);
  const initialValues = {
    phoneNumber: "",
    hostelName: "",
    hostelRoomNumber: "",
    relationshipStatus: "",
    semester: "",
  };

  const handleDialogOpen = (values) => {
    setFormValues(values);
    setIsDialogOpen(true);
  };
  const getUserProfile = (userID) => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://manthanr.onrender.com/v1/get-user-info/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log(res);
        const { profile_pic, contactNumber, semester, ...rest } = res.data;
        setCurrentSem(res.data.semester);
        const needed_data = {
          profile_pic,
          contactNumber,
          semester,
        };

        setObj(needed_data);

        // initialValues.phoneNumber = contactNumber; // Show contactNumber as phoneNumber
        //initialValues.semester = semester; // Keep semester visible
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    const parsedUserData = JSON.parse(storedUserData);
    setUser(parsedUserData);
    // console.log(parsedUserData);

    if (parsedUserData?.userID) {
      getUserProfile(parsedUserData.userID);
    }
  }, []);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeInKB = file.size / 1024;
      const maxSizeInKB = 750;

      if (fileSizeInKB > maxSizeInKB) {
        toast.error(`File size should be less than ${maxSizeInKB} KB.`);
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

  const hostelOptions = [
    { label: "Select Hostel", value: "" },
    { label: "APJ Kalam Hostel", value: "APJ Kalam" },
    { label: "Asima Hostel", value: "Asima" },
    { label: "AryaBhatt Hostel", value: "AryaBhatta" },
    { label: "AryaBhatt Hostel Girls", value: "AryaBhatta (Girls)" },
    { label: "CV Raman Hostel", value: "CV Raman" },
    { label: "Married", value: "Married" },
  ];

  const relationshipStatusOptions = [
    { label: "Select Relationship Status", value: "" },
    { label: "Single", value: "Single" },
    { label: "In a Relationship", value: "In a Relationship" },
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

  const onSubmit = async () => {
    const values = formValues;
    setIsDialogOpen(false);
    if (values.phoneNumber && !values.phoneNumber.match(/^[1-9]\d{9}$/)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    if (
      values.hostelRoomNumber &&
      !values.hostelRoomNumber.match(/^[a-zA-Z0-9-_/\\]{1,10}$/)
    ) {
      toast.error("Please enter a valid room number");
      return;
    }
    setIsSubmitting(true);
    // console.log(values);
    const formData = new FormData();
    formData.append("user", user.userID);
    formData.append("contactNumber", values.phoneNumber);
    formData.append("hostelName", values.hostelName);
    formData.append("room", values.hostelRoomNumber);
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
        if (res.data.message === "Profile updated successfully") {
          toast.success("Profile updated");
          navigate("/usersection");
        }
      })
      .catch((err) => {
        toast.error("Some error occured");
        navigate("/usersection");
      });
  };

  return (
    <div className="w-full bg-blue-200 min-h-[110vh] sm:min-h-[120vh] font-montserrat">
      <Header />
      <Formik initialValues={initialValues} onSubmit={handleDialogOpen}>
        {({ values, errors, touched, isValid, dirty }) => (
          <Form className="w-[95%] sm:w-[70%] md:w-[60%] lg:w-[50%] mx-auto relative top-20 sm:top-28 font-montserrat shadow-xl p-4 sm:p-6 rounded-xl bg-white">
            <div>
              <h1 className="uppercase font-bold text-xl mb-4 underline">
                Edit Profile
              </h1>
            </div>

            <div className="mb-4">
              <label className="text-xs sm:text-sm xl:text-base font-medium">
                Current profile picture:
              </label>
              {obj.profile_pic ? (
                <img
                  src={obj.profile_pic}
                  alt="current profile"
                  className="h-24 w-24 mb-4 rounded-full border"
                />
              ) : (
                <div className="text-sm mb-3 text-gray-500">
                  No profile picture available
                </div>
              )}

              <Field
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm xl:text-base focus:outline-none focus:border-2 focus:border-blue-400"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex-1 min-w-28 mb-4">
                <Field
                  as="select"
                  name="hostelName"
                  className={`w-full px-3 py-2 xl:py-2.5 border rounded-md text-xs bg-white sm:text-sm xl:text-base focus:outline-none focus:border-2 focus:border-blue-400 ${
                    !values.hostelName ? "text-gray-400" : "text-black"
                  }`}
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
              <div className="flex-1 ml-2 mb-4">
                <Field
                  type="text"
                  name="hostelRoomNumber"
                  placeholder="Room No."
                  className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm xl:text-base focus:outline-none focus:border-2 focus:border-blue-400"
                />
                <ErrorMessage
                  name="hostelRoomNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="mb-4">
              <Field
                as="select"
                name="relationshipStatus"
                className={`w-full px-3 py-2 border rounded-md bg-white text-xs sm:text-sm xl:text-base focus:outline-none focus:border-2 focus:border-blue-400 ${
                  !values.relationshipStatus ? "text-gray-400" : "text-black"
                }`}
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
                className={`w-full px-3 py-2 border rounded-md bg-white text-xs sm:text-sm xl:text-base focus:outline-none focus:border-2 focus:border-blue-400 ${
                  !values.semester ? "text-gray-400" : "text-black"
                }`}
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
              <p className="text-xs sm:text-sm xl:text-base font-medium mb-1">
                Upload new Profile Picture: (Max size: 750 KB)
                <a
                  href="https://image.pi7.org/reduce-image-size-in-kb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline text-xs font-medium ml-2"
                >
                  Compress Image
                </a>
              </p>
              <input
                type="file"
                onChange={uploadImage}
                accept="image/*"
                className="mb-2 max-w-60 text-xs sm:text-sm xl:text-base"
              />
              {image && (
                <img
                  src={image}
                  alt="Selected"
                  className="max-h-60 max-w-40 rounded-md"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
            <div className="flex justify-between items-end">
              <button
                type="button"
                onClick={(values) => {
                  navigate("/forgot-password");
                }}
                className="underline py-1 hover:text-blue-600 rounded-md text-base"
              >
                Change Password
              </button>{" "}
              <button
                type="submit"
                className={`bg-blue-500 text-white py-2 px-4 font-medium rounded-md hover:bg-blue-600 ${
                  isSubmitting || !isValid || !(dirty || image)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={isSubmitting || !isValid || !(dirty || image)}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <DialogModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={onSubmit}
        paragraph="Are you sure you want to update your profile information?"
        closeBtnText="Cancel"
        submitBtnText="Update"
      />
    </div>
  );
};

export default EditProfileForm;
