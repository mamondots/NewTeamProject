import React from "react";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading)
    return (
      <div className="text-center h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  if (user && !loading) return children;
  else return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
