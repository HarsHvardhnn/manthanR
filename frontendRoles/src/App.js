import { useState } from "react";
import { superadminContext, userContext, adminContext } from "./context";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Auth/Login";
import "./App.css";
import UpdateProfile from "./components/User/UpdateProfile";
import Chatbot from "./components/User/Chatbot";
import MainPage from "./components/Home/MainPage";
import AdminLogin from "./components/Auth/AdminLogin"
import { authContext } from "./context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPanel from "./AdminPanel";
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

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/UpdateProfile",
      element: <UpdateProfile />,
    },
    {
      path: "/adminPanel",
      element: <AdminPanel />,
    },
    {
      path: "/add-user",
      element: <UserForm/>,
    },
    {
      path: "/Chatbot",
      element: <Chatbot />,
    },
    {
      path: "/edit-profile",
      element:<EditProfileForm/>,
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
      element: <UserSection/>
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
    </>
  );
}

export default App;
