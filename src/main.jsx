import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage.jsx";
import ProgammingPage from "./pages/ProgrammingPage.jsx";
import CovidPage from "./pages/CovidPage.jsx";
import SavedNewsPage from "./pages/SavedNews.jsx";
import SearchPage from "./pages/SearchPage.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/saved",
    element: <SavedNewsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/programming",
    element: <ProgammingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/covid-19",
    element: <CovidPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search/:params",
    element: <SearchPage/>,
    errorElement: <ErrorPage />,
  }
]);
root.render(
  <React.Fragment>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.Fragment>
);
