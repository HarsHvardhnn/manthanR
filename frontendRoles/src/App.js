import { useState, useEffect, useContext } from "react";
import { superadminContext, userContext, adminContext } from "./context";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import "./App.css";
import UpdateProfile from "./components/User/UpdateProfile";
import Chatbot from "./components/User/Chatbot";
import MainPage from "./components/Home/MainPage";
import AdminLogin from "./components/Auth/AdminLogin";
import { authContext } from "./context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import fetchUserData from "./components/Auth/FetchUserInfo";
function App() {
  const [user, setUser] = useState({
    username: "",
    userID: "",
    email: "",
    assigned_admin: "",
    assigned_admin_id: "",
  });
  const [auth, setAuth] = useState(false);
  const [superadmin, setsuperadmin] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState({
    username: "",
    adminID: "",
    email: "",
  });
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (user.userID) {
        const storedProfileStatus = localStorage.getItem("isProfileComplete");
        if (storedProfileStatus) {
          setIsProfileComplete(JSON.parse(storedProfileStatus));
          console.log(
            "Loaded isProfileComplete from localStorage:",
            storedProfileStatus
          );
        } else {
          const { isProfileComplete, hasAcceptedTnc } = await fetchUserData(
            user.userID
          );
          setIsProfileComplete(isProfileComplete);
          localStorage.setItem("isProfileComplete", JSON.stringify(isProfileComplete));
        }
      }
    };
    checkProfileCompletion();
  }, [user.userID]);
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/UpdateProfile",
      element: isProfileComplete ? <UserSection /> : <UpdateProfile />,
    },
    {
      path: "/add-user",
      element: <UserForm />,
    },
    {
      path: "/Chatbot",
      element: isProfileComplete ? <Chatbot /> : <UpdateProfile />,
    },
    {
      path: "/edit-profile",
      element: isProfileComplete ? <EditProfileForm /> : <UpdateProfile />,
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
      element: isProfileComplete ? <Disclaimer /> : <UpdateProfile />,
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
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/usersection",
      element: isProfileComplete ? <UserSection /> : <UpdateProfile />,
    },
    {
      path: "/ProfileUpdatePage",
      element: <ProfileUpdatePage />,
    },
    {
      path: "/Summary",
      element: <Summary />,
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionManager />
          <loadingContext.Provider value={{ loading, setLoading }}>
            <userContext.Provider value={{ user, setUser }}>
              <superadminContext.Provider value={{ superadmin, setsuperadmin }}>
                <adminEmailContext.Provider
                  value={{ adminEmail, setAdminEmail }}
                >
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
