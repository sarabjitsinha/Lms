import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Error from "./component/Error";
import Home from "./component/Home";
import Login from "./component/Login";
import Registration from "./component/Registration";
import CourseCatalog from "./component/CourseCatalog";
import CoursePlayer from "./component/CoursePlayer";
import QuizEngine from "./component/QuizEngine";
import Forum from "./component/Forum";
import Certificates from "./component/Certificates";
import InstructorStudio from "./component/InstructorStudio";
import Account from "./component/Account";
import Messages from "./component/Messages";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/userhome", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Registration /> },
      { path: "/courses", element: <CourseCatalog /> },
      { path: "/courses/:id", element: <CoursePlayer /> },
      { path: "/quizzes", element: <QuizEngine /> },
      { path: "/quizzes/:id", element: <QuizEngine /> },
      { path: "/forum", element: <Forum /> },
      { path: "/certificates", element: <Certificates /> },
      { path: "/instructor", element: <InstructorStudio /> },
      { path: "/account", element: <Account /> },
      { path: "/messages", element: <Messages /> }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
