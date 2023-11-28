import React from "react";
import useAdmin from "../hooks/useAdmin";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { roleContext } from "../providers/RoleProvider";

const AdminRoute = ({ children }) => {
  const {adminLoading, admin} = useContext(roleContext);

  if (adminLoading)
    return (
      <div className="text-center h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );

  if (admin) return children;
  else return <Navigate to="/dashboard" />;
};

export default AdminRoute;
