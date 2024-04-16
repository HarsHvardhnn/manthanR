import { useState } from "react";
import { superadminContext, userContext ,adminContext  } from "./context";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Auth/Login";
import "./App.css";
import UpdateProfile from "./components/Auth/UpdateProfile"
import Chatbot from "./components/Auth/Chatbot";
import MainPage from "./components/Home/MainPage";
import AdminLogin from "./components/Auth/AdminLogin";
import { authContext } from "./context";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPanel from "./AdminPanel";
import AdminDashboard from "./components/Admin/AdminDashboard";
// import AdminDashboard from "./components/SuperAdmin/SuperAdminDashboard";
import SuperAdminDashboard from "./components/Admin/SuperAdminDashboard";
import ForgotPassword from "./components/Auth/ForgotPassword";
import SuperAdminLogin from "./components/Admin/SuperAdminLogin";
import Disclaimer from "./components/Home/Disclaimer";
// import SuperAdminLogin from "./components/Admin/SuperAdminLogin";
// import { useNavigate } from "react-router-dom";





function App() {
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);
  const [superadmin,setsuperadmin] = useState("");
  const [admin,setAdmin] = useState("");

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
      element: <AdminPanel/>,
    },
     {
      path: "/Chatbot",
      element: <Chatbot />,
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
      path:"/superadminlogin",
      element:<SuperAdminLogin/>
    },
    {
      path:'/disclaimer',
      element:<Disclaimer/>
    }
    ,
    {
      path: "/AdminDashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/SuperAdminDashboard",
      element: <SuperAdminDashboard/>,
    },
    {
      path:'/forgot-password',
      element:(<ForgotPassword/>)
    }
  
  ]);
  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <superadminContext.Provider value={{superadmin,setsuperadmin}}>
        <adminContext.Provider value={{admin,setAdmin}}>
        <authContext.Provider value={{ auth, setAuth }}>
          <RouterProvider router={router} />
          <ToastContainer/>
        </authContext.Provider>
        </adminContext.Provider>
        </superadminContext.Provider>
      </userContext.Provider>
    </>
  );
}

export default App;
