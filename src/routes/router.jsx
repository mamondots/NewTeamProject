import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AdoptableAnimals from "../pages/AdoptableAnimals/AdoptableAnimals";
import MissingAnimals from "../pages/MissingAnimals/MissingAnimals";
import AdoptionPost from "../pages/AdoptionPost/AdoptionPost";
import MissingPost from "../pages/MissingPost/MissingPost";
import Quiz from "../pages/Quiz/Quiz";
import PrivateRoute from "./PrivateRoute";
import Donation from "../pages/Donation/Donation";
import Payment from "../pages/Donation/Payment";
import SinglePetView from "../pages/SinglePetView/SinglePetView";
import WishList from "../pages/WishList/WishList";
import Messaging from "../pages/Messaging/Messaging";
import ContactPage from "../pages/ContactPage/ContactPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import TeamPage from "../pages/TeamPage/TeamPage";
import DashboardLayout from "../layouts/DashboardLayout";
import AdoptionPosts from "../pages/Dashboard/AdoptionPosts/AdoptionPosts";
import MissingPosts from "../pages/Dashboard/MissingPosts/MissingPosts";
import Profile from "../pages/Dashboard/Profile/Profile";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import UpdateProfile from "../pages/Dashboard/AdminHome/UpdateProfile/UpdateProfile";
import UserWishlist from "../pages/Dashboard/UserWishlist/UserWishlist";
import SearchPage from "../pages/SearchPage/SearchPage";
import AdoptedAnimals from "../pages/Dashboard/AdoptedAnimals/AdoptedAnimals";
import ReunionedAnimals from "../pages/Dashboard/ReunionedAnimals/ReunionedAnimals";
import RaisedFunds from "../pages/Dashboard/RaisedFunds/RaisedFunds";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "search",
        element: <SearchPage></SearchPage>,
      },
      {
        path: "register",
        element: <Login></Login>,
      },
      {
        path: "contact",
        element: <ContactPage></ContactPage>,
      },
      {
        path: "about",
        element: <AboutPage></AboutPage>,
      },
      {
        path: "team",
        element: <TeamPage></TeamPage>,
      },
      {
        path: "adoptable-animals",
        element: <AdoptableAnimals />,
      },
      {
        path: "lost-animals",
        element: <MissingAnimals />,
      },
      {
        path: "create-adoption-post",
        element: (
          <PrivateRoute>
            <AdoptionPost />
          </PrivateRoute>
        ),
      },
      {
        path: "create-missing-post",
        element: (
          <PrivateRoute>
            <MissingPost />
          </PrivateRoute>
        ),
      },
      {
        path: "donate",
        element: (
          <PrivateRoute>
            <Donation />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "wishlist",
        element: <WishList></WishList>,
      },
      {
        path: "adoptable-animals/:id",
        element: <SinglePetView />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <DashboardHome /> },
          {
            path: "adoption-posts",
            element: (
              <AdminRoute>
                <AdoptionPosts />
              </AdminRoute>
            ),
          },
          {
            path: "missing-posts",
            element: (
              <AdminRoute>
                <MissingPosts />
              </AdminRoute>
            ),
          },
          {
            path: "profile",
            element: (
              <UserRoute>
                <Profile />
              </UserRoute>
            ),
          },
          {
            path: "adopted-animals",
            element: (
              <AdminRoute>
                <AdoptedAnimals />
              </AdminRoute>
            ),
          },
          {
            path: "reunioned-animals",
            element: (
              <AdminRoute>
                <ReunionedAnimals />
              </AdminRoute>
            ),
          },
          {
            path: "raised-funds",
            element: (
              <AdminRoute>
                <RaisedFunds />
              </AdminRoute>
            ),
          },
        ],
      },
      {
        path: "/messaging",
        element: (
          <UserRoute>
            <Messaging />
          </UserRoute>
        ),
      },
    ],
  },
]);
