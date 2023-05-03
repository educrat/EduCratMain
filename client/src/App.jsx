import { createContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import SignupPage from "./pages/signup/SignupPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import PageLayout from "./components/layouts/PageLayout";
import SignupTutorPage from "./pages/signup/SignupTutorPage";
import StudentDashboard from "./pages/studentDashboard/StudentDashboard";
import TutorDashboard from "./pages/tutorDashboard/TutorDashboard";
import TutorOrdersPage from "./pages/tutorOrders/TutorOrdersPage";
import TutorEarnings from "./pages/tutorEarnings/TutorEarnings";
// import Messages from "./pages/messages/Messages";
// import Messenger from "./pages/messenger/Messenger";
import TutorMessanger from "./pages/tutorMessanger/TutorMessanger";
import ProfilePage from "./pages/profile/ProfilePage";
import CreateNewGigPage from "./pages/createNewGig/CreateNewGigPage";
import Message from "./components/tutorMessenger/message/Message/Message";
import Category from "./components/Category/category";
import { useCookies } from "react-cookie";
import axios from "axios";
import { backendURL } from "./data/vars";
import TutorSignupQuestions from "./pages/TutorSignupQuestions/TutorSignupQuestions";
import TutorGigpage from "./pages/tutorGig/TutorGigpage";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import UploadFileDelete from "./components/UploadFileDelete";

import AppUserContext from "./context/AppUserContext";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import SearchGig from "./pages/searchGig/SearchGig";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
import StudentOrdersPage from "./pages/studentOrders/StudentOrdersPage";
import FeedbackPage from "./pages/feedbackPage/FeedbackPage";

function App() {
  const componentList = [
    { path: "/", component: <HomePage /> },
    { path: "/signup", component: <SignupPage /> },
    { path: "/login", component: <LoginPage /> },
  ];

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [appUser, setAppUser] = useState();
  const [refresh, setRefresh] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const cld = new Cloudinary({
    cloud: {
      cloudName: "educrat",
    },
  });

  useEffect(() => {
    console.log(location.pathname);
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/signup-tutor" &&
      location.pathname !== "/forgot-password" &&
      location.pathname.split("/")[1] !== "update-password"
    ) {
      if (!accessToken && location.pathname !== "/") {
        navigate("/");
      } else if (accessToken) {
        axios
          .get(backendURL + "/user/" + accessToken)
          .then((res) => {
            if (res.status && res.status === "failed") {
              alert(res.message);
            } else {
              if (location.pathname === "/") {
                navigate("/dashboard");
              }
              console.log(res.data);
              setAppUser(res.data.user);
              if (refresh) {
                setRefresh(false);
              }
            }
          })
          .catch((err) => {
            navigate("/login");
            alert(err.message);
          });
      }
    }
    return () => console.log("Cleanup..");
  }, [refresh]);

  return (
    <AppUserContext.Provider value={{ appUser, setAppUser }}>
      <Routes>
        {/* Home page with layout */}
        <Route
          path="/"
          element={
            <PageLayout
              homepage={true}
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              navbarType={"home"}
            />
          }
        >
          <Route index element={<HomePage token={accessToken} />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/update-password/:userId"
          element={<UpdatePassword />}
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>

        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/upload-img" element={<UploadFileDelete />}></Route>
        <Route path="/signup-tutor" element={<SignupTutorPage />}></Route>
        <Route
          path="/dashboard"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              navbarType={"dashboard"}
            />
          }
        >
          <Route index element={<StudentDashboard />} />
        </Route>
        <Route
          path="/tutor-dashboard"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              navbarType={"tutor_dashboard"}
            />
          }
        >
          <Route index element={<TutorDashboard />} />
        </Route>
        <Route
          path="/tutor-orders"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              hideFooter={true}
              navbarType={"tutor_dashboard"}
            />
          }
        >
          <Route index element={<TutorOrdersPage />} />
        </Route>

        <Route
          path="/user/:usertype/feedback"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              navbarType={"dashboard"}
            />
          }
        >
          <Route path=":feedbackId" element={<FeedbackPage />} />
        </Route>

        <Route
          path="/students-orders"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              hideFooter={true}
              navbarType={"dashboard"}
            />
          }
        >
          <Route index element={<StudentOrdersPage />} />
        </Route>
        <Route path="/search" element={<PageLayout navbarType={"dashboard"} />}>
          <Route index element={<SearchGig />} />
        </Route>
        <Route
          path="/inbox"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              hideFooter={true}
              navbarType={"tutor_dashboard"}
            />
          }
        >
          <Route index element={<TutorMessanger />} />
        </Route>
        <Route
          path="/tutor-earnings"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              hideFooter={true}
              navbarType={"tutor_dashboard"}
            />
          }
        >
          <Route index element={<TutorEarnings />} />
        </Route>
        <Route
          path="/tutor-earnings"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              hideFooter={true}
              navbarType={"tutor_dashboard"}
            />
          }
        >
          <Route index element={<TutorEarnings />} />
        </Route>
        <Route
          path="/profile"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              hideFooter={true}
              navbarType={appUser?.role === 1 ? "tutor_dashboard" : "dashboard"}
            />
          }
        >
          <Route index element={<ProfilePage />} />
        </Route>
        <Route
          path="/profile/:id"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              hideFooter={true}
              navbarType={appUser?.role === 1 ? "tutor_dashboard" : "dashboard"}
            />
          }
        >
          <Route index element={<ProfilePage type={"another"} />} />
        </Route>
        <Route
          path="/create-new-gig"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              hideFooter={true}
              navbarType={"tutor_dashboard"}
            />
          }
        >
          <Route index element={<CreateNewGigPage />} />
        </Route>
        <Route
          path="/category"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              navbarType={"default"}
            />
          }
        >
          <Route path=":categoryId" element={<Category />} />
        </Route>
        <Route
          path="/tutor-signup-questions"
          element={<TutorSignupQuestions />}
        ></Route>
        <Route
          path="/tutor-gig"
          element={
            <PageLayout
              isTutor={appUser ? (appUser.role === 1 ? true : false) : false}
              navbarType={"dashboard"}
            />
          }
        >
          <Route path=":gigId" element={<TutorGigpage />} />
        </Route>

      

        <Route path="/paymentsuccess" element={<PaymentSuccess />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </AppUserContext.Provider>
  );
}

export default App;
