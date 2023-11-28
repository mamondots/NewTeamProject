import React from "react";
import useAdmin from "../../../hooks/useAdmin";
import AdminHome from "../AdminHome/AdminHome";
import UserHome from "../UserHome/UserHome";
import { useContext } from "react";
import { roleContext } from "../../../providers/RoleProvider";

const DashboardHome = () => {
  const { admin, adminLoading } = useContext(roleContext);
  if (adminLoading)
    return (
      <div className="text-center h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  if (admin) return <AdminHome />;
  else return <UserHome />;
};

export default DashboardHome;
