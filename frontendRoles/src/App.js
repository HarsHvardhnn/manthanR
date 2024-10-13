import { useState } from "react";
import { superadminContext, userContext, adminContext } from "./context";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import Disclaimer from "./components/Home/Disclaimer";
import UserSection from "./components/User/UserSection";
import { loadingContext } from "./context";
import { adminEmailContext } from "./context";
import EditProfileForm from "./components/User/edit_profile";
import EventsPage from "./components/Home/EventsPage";
import SessionManager from "./SessionManager";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import Protected from "./Protected";
import QuizPage from "./components/Quiz/QuizPage";
import Blogs from "./components/Blog/Blogs";
import Consult from "./components/Home/Consult";
import BlogDetail from "./components/Blog/BlogDetail";
import QuizPlayground from "./components/Quiz/QuizPlayground";

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
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/updateprofile",
      element: <Protected Component={UpdateProfile} />,
    },
    {
      path: "/chatbot",
      element: <Protected Component={Chatbot} />,
    },
    {
      path: "/edit-profile",
      element: <Protected Component={EditProfileForm} />,
    },
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/adminlogin",
      element: <Protected Component={AdminLogin} />,
    },
    {
      path: "/quizzes",
      element: <QuizPage/>,
    },
    {
      path: "/quizzes/:quizTitle",
      element: <QuizPlayground/>,
    },
    {
      path: "/disclaimer",
      element: <Protected Component={Disclaimer} />,
    },
    {
      path: "/admindashboard",
      element: <AdminDashboard />,
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
      element: <Protected Component={UserSection} />,
    },
    {
      path: "/upcoming-events",
      element: <EventsPage />,
    },
    {
      path: "/blogs",
      element: <Blogs />,
    },
    {
      path: "/blogs/:category/:blogTitle",
      element: <BlogDetail />,
    },
    {
      path: "/consult",
      element: <Consult />,
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
