import { useState, useEffect } from "react";
import { superadminContext, userContext, adminContext } from "./context";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import "./App.css";
import UpdateProfile from "./components/User/UpdateProfile";
import Chatbot from "./components/User/Chatbot";
import MainPage from "./components/Home/MainPage";
import AdminLogin from "./components/Auth/AdminLogin"
import { authContext } from "./context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AdminPanel from "./AdminPanel";
import AdminDashboard from "./components/Admin/AdminDashboard";
import SuperAdminDashboard from "./components/SuperAdmin/SuperAdminDashboard";
import ForgotPassword from "./components/Auth/ForgotPassword";
import SuperAdminLogin from "./components/Auth/SuperAdminLogin";
import Disclaimer from "./components/Home/Disclaimer";
import UserSection from "./components/User/UserSection";
import ProfileUpdatePage from "./components/User/UpdateProfile";
import UserForm from "./components/SuperAdmin/addUser";
import Summary from "./components/Summary";
import { loadingContext } from "./context";
import { adminEmailContext } from "./context";
import EditProfileForm from "./components/User/edit_profile";
import FileUpload from "./components/User/FileUpload";
import SessionManager from "./SessionManager";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store'; 
import axios from "axios";

function ProtectedRoute({ element, token, user }) {
  const [isProfileComplete, setIsProfileComplete] = useState(null);

  useEffect(() => {
    if (user && token) {
      axios
        .get(`https://manthanr.onrender.com/v1/get-user-info/${user.userID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsProfileComplete(res.data.is_profile_complete);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, token]);
  

  if (!isProfileComplete) {
    return <Navigate to="/updateprofile" />;
  }

  return element;
}

function App() {
  const [user, setUser] = useState({ username: '', userID: '',email:'',assigned_admin:'',assigned_admin_id:''});
  const [auth, setAuth] = useState(false);
  const [superadmin, setsuperadmin] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState({
    username:'',
    adminID:'',
    email:''
  });
  const token = localStorage.getItem("token");

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/UpdateProfile",
      element: <UpdateProfile />,
    },
    // {
    //   path: "/adminPanel",
    //   element: <AdminPanel />,
    // },
    {
      path: "/add-user",
      element: <UserForm/>,
    },
    {
      path: "/Chatbot",
      element: <ProtectedRoute element={<Chatbot />} token={token} user={user} />,
    },
    {
      path: "/edit-profile",
      element: <ProtectedRoute element={<EditProfileForm />} token={token} user={user} />,
    },
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/AdminLogin",
      element: <AdminLogin />,
    },
    {
      path: "/superadminlogin",
      element: <SuperAdminLogin />,
    },
    {
      path: "/disclaimer",
      element: <Disclaimer />,
    },
    {
      path: "/AdminDashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/upload-student-data",
      element: <FileUpload />,
    },
    {
      path: "/SuperAdminDashboard",
      element: <SuperAdminDashboard />,
    },
    {
      path:'/forgot-password',
      element:(<ForgotPassword/>)
    },
    {
      path: '/usersection',
      element: <ProtectedRoute element={<UserSection />} token={token} user={user} />,
    },
    {
      path: '/ProfileUpdatePage',
      element: <ProfileUpdatePage/>
    },
    {
      path: '/Summary',
      element: <Summary/>
    },
   
  ]);
  return (
    <>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <SessionManager/>
      <loadingContext.Provider value={{ loading, setLoading }}>
        <userContext.Provider value={{ user, setUser }}>
          <superadminContext.Provider value={{ superadmin, setsuperadmin }}>
            <adminEmailContext.Provider value={{ adminEmail, setAdminEmail }}>
              <adminContext.Provider value={{ admin, setAdmin }}>
                <authContext.Provider value={{ auth, setAuth }}>
                    <RouterProvider router={router} />
                    <ToastContainer />
               
                </authContext.Provider>
              </adminContext.Provider>
            </adminEmailContext.Provider>
          </superadminContext.Provider>
        </userContext.Provider>
      </loadingContext.Provider>
      </PersistGate>
      </Provider>
    </>
  );
}

export default App;