import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { roleContext } from "../providers/RoleProvider";

const Dashboard = () => {
  const {admin, adminLoading} = useContext(roleContext);
  const adminLinks = [
    { id: 1, title: "Dashboard Home", to: "/dashboard" },
    { id: 2, title: "Manage Adoptions Posts", to: "/dashboard/adoption-posts" },
    { id: 3, title: "Manage Missing Posts", to: "/dashboard/missing-posts" },
    { id: 4, title: "Adopted Animals", to: "/dashboard/adopted-animals" },
    { id: 6, title: "Reunioned Animals", to: "/dashboard/reunioned-animals" },
    { id: 5, title: "Fund Rises", to: "/dashboard/raised-funds" },
  ];
  const userLinks = [
    { id: 1, title: "Dashboard Home", to: "/dashboard" },
    { id: 2, title: "Profile", to: "/dashboard/profile" },
    { id: 3, title: "My WishList", to: "/dashboard/userwishlist" },
  ];

  const links = admin ? adminLinks : userLinks;
  if (adminLoading)
    return (
      <div className="h-screen flex justify-center items-center text-center">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen mt-20 lg:mt-32">
      <div className="lg:col-span-1 border-r hidden lg:block">
        <ul className="px-5 space-y-3">
          <h2 className="text-center font-bold text-2xl text-gray-800">
            {admin ? "Admin" : "User"} Dashboard
          </h2>
          {links.map(({ id, title, to }) => (
            <li key={id}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-md duration-300 ${
                    isActive
                      ? "bg-[#fc5f5f] text-white hover:bg-[#fc5f5f]"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-3 lg:overflow-y-auto lg:overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
