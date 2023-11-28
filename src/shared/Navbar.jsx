import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import {
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineLogin,
  AiOutlineUser,
} from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Button from "../Components/Button/Button";
import Logo from "../assets/logo.png";
import Swal from "sweetalert2";
import spinnerGif from "../assets/spinner.gif";
import useWishList from "../hooks/useWishList";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [information] = useWishList();

  useEffect(() => {
    setChangeColor(location.pathname !== "/");
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 90 || location.pathname !== "/")
        setChangeColor(true);
      else setChangeColor(false);
    });
  }, [location.pathname]);

  const handleAddFriend = () => {
    Swal.fire({
      title: "Please select the post type",
      text: "Adoption post or Missing post",
      width: 600,
      padding: "3em",
      color: "#E66777",
      background: "#fff",
      backdrop: `
        rgba(0,0,0,0.5)
        url("${spinnerGif}")
        left top
        no-repeat
      `,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Adoption Post",
      denyButtonText: "Missing Post",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/create-adoption-post");
      } else if (result.isDenied) {
        navigate("/create-missing-post");
      } else {
        return;
      }
    });
  };

  const commonLinks = [
    { id: 2, name: "Adopt a Pet", to: "/adoptable-animals" },
    { id: 3, name: "Lost Pets", to: "/lost-animals" },
  ];
  //   {
  //     id: 1,
  //     name: "Pages",
  //     hasSubMenu: true,
  //     subMenu: [
  //       {
  //         id: 2,
  //         head: "Topwear",
  //         links: [
  //           { id: 3, name: "T-shirt", to: "/" },
  //           { id: 4, name: "T-shirt", to: "/" },
  //           { id: 5, name: "T-shirt", to: "/" },
  //           { id: 6, name: "T-shirt", to: "/" },
  //           { id: 7, name: "T-shirt", to: "/" },
  //         ],
  //       },
  //       {
  //         id: 8,
  //         head: "Topwear",
  //         links: [
  //           { id: 9, name: "T-shirt", to: "/" },
  //           { id: 10, name: "T-shirt", to: "/" },
  //           { id: 11, name: "T-shirt", to: "/" },
  //           { id: 12, name: "T-shirt", to: "/" },
  //           { id: 13, name: "T-shirt", to: "/" },
  //         ],
  //       },
  //       {
  //         id: 14,
  //         head: "Topwear",
  //         links: [
  //           { id: 15, name: "T-shirt", to: "/" },
  //           { id: 16, name: "T-shirt", to: "/" },
  //           { id: 17, name: "T-shirt", to: "/" },
  //           { id: 18, name: "T-shirt", to: "/" },
  //           { id: 19, name: "T-shirt", to: "/" },
  //         ],
  //       },
  //       {
  //         id: 20,
  //         head: "Topwear",
  //         links: [
  //           { id: 21, name: "T-shirt", to: "/" },
  //           { id: 22, name: "T-shirt", to: "/" },
  //           { id: 23, name: "T-shirt", to: "/" },
  //           { id: 24, name: "T-shirt", to: "/" },
  //           { id: 25, name: "T-shirt", to: "/" },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  const notUserLinks = [
    { id: 4, name: "Login", to: "/login", icon: <AiOutlineLogin size={20} /> },
  ];

  const commonLinksElements = commonLinks.map((link) => (
    <li key={link.id} onClick={() => setIsMobileNavOpen(false)}>
      <Link to={link.to} className="lg:py-7 inline-block cursor-pointer">
        {link.name}
      </Link>
    </li>
  ));

  const notUserLinksElements = !user
    ? notUserLinks.map((link) => (
        <li key={link.id} onClick={() => setIsMobileNavOpen(false)}>
          <Link
            to={link.to}
            className="lg:py-7 cursor-pointer flex items-center gap-3"
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        </li>
      ))
    : null;
  const addFriendElement = (
    <li
      onClick={() => {
        handleAddFriend();
        setIsMobileNavOpen(false);
      }}
    >
      <span className="lg:py-7 inline-block cursor-pointer">Add a Friend</span>
    </li>
  );
  const avatarElement = user && (
    <li className="flex flex-col lg:flex-row gap-3 items-center cursor-pointer group relative">
      <img
            src={user?.photoURL}
            alt=""
            className="w-16 h-16 border rounded-full mx-auto object-cover lg:hidden"
          />
      <AiOutlineUser size={20} className="hidden lg:block"/>
      <span>{user.displayName || "User"}</span>
      <button
        className="lg:hidden bg-[#FC7676] text-white py-2 px-4 w-full rounded-full flex gap-1 justify-center items-center"
        onClick={() => navigate("/messaging")}
      >
        <AiOutlineMessage size={20} />
        <span>Inbox</span>
      </button>
      <button
        className="lg:hidden bg-red-500 text-white py-2 px-4 w-full rounded-full flex gap-1 justify-center items-center"
        onClick={logOut}
      >
        <AiOutlineLogout size={20} />
        <span>Logout</span>
      </button>
      <div className="hidden lg:group-hover:block absolute top-[100%] right-0 min-w-[200px]">
        <div className="bg-white rounded-md text-gray-600 p-5 border shadow-md text-center space-y-3">
          <img
            src={user?.photoURL}
            alt=""
            className="w-16 h-16 border rounded-full mx-auto object-cover"
          />
          <p>{user.email}</p>
          <button
            className="bg-[#FC7676] text-white py-2 w-full rounded-full flex gap-1 justify-center items-center"
            onClick={() => navigate("/messaging")}
          >
            <AiOutlineMessage size={20} />
            <span>Inbox</span>
          </button>
          <button
            className="bg-red-500 text-white py-2 w-full rounded-full flex gap-1 justify-center items-center"
            onClick={logOut}
          >
            <AiOutlineLogout size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </li>
  );

  const dashboardElement = user && (
    <li onClick={() => setIsMobileNavOpen(false)}>
      <Link
        to="/dashboard"
        className="lg:py-7 cursor-pointer flex items-center gap-3"
      >
        <span>Dashboard</span>
      </Link>
    </li>
  );
  const wishlistElement = user && (
    <li onClick={() => setIsMobileNavOpen(false)}>
      <Link
        to="/wishlist"
        className="lg:py-7 cursor-pointer flex items-center gap-3"
      >
        <span>Wishlist</span>
      </Link>
    </li>
  );

  return (
    <>
      <nav className="p-3 fixed top-0 w-full z-50">
        <div
          className={`container mx-auto duration-200 ${
            changeColor
              ? "bg-white rounded-full p-1 lg:px-5 shadow-lg border"
              : ""
          }`}
        >
          <div className="flex justify-between items-center font-medium">
            <div
              className={
                changeColor ? "bg-[#FC7676] w-fit pr-3 rounded-full" : ""
              }
            >
              <Link to="/">
                <img src={Logo} alt="logo" className="cursor-pointer h-12" />
              </Link>
            </div>

            {/* big device nav */}
            <ul
              className={`hidden lg:flex items-center gap-8 font-bold text-sm relative ${
                changeColor ? "text-gray-600" : "text-white"
              }`}
            >
              {commonLinksElements}
              {addFriendElement}
              {dashboardElement}
              {avatarElement}
              {notUserLinksElements}

              <Link to="/wishlist">
                <div className="relative cursor-pointer">
                  <li className="text-2xl">
                    <AiFillHeart></AiFillHeart>
                  </li>
                  <p className="text-[12px] w-4 text-center h-4 rounded-full bg-[#FC7676] inline-block wish-number text-[#fff]">
                    {information.length}{" "}
                  </p>
                </div>
              </Link>
              {/* <Button className="text-white">Donate</Button> */}
              <Link className="donation" to="/donate">
                Donate
              </Link>
            </ul>
            {/* Hamburger icon */}
            <HiOutlineMenuAlt4
              size={30}
              onClick={() => setIsMobileNavOpen(true)}
              className={`${
                changeColor ? "text-graya-800 mr-2" : "text-white"
              } lg:hidden cursor-pointer`}
            />
          </div>
        </div>
        {/* mobile nav */}
        <ul
          className={`lg:hidden fixed top-0 bg-white w-full h-full z-50 p-5 duration-500 space-y-5 overflow-y-auto ${
            isMobileNavOpen ? "left-0" : "left-[-100%]"
          }`}
        >
          <div className="flex justify-between items-center">
            <div
              className="bg-[#FC7676] w-fit pr-3 rounded-full"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <Link to="/">
                <img src={Logo} alt="logo" className="cursor-pointer h-12" />
              </Link>
            </div>
            <AiOutlineClose
              size={30}
              onClick={() => setIsMobileNavOpen(false)}
              className="cursor-pointer"
            />
          </div>
          {commonLinksElements}
          {addFriendElement}
          {wishlistElement}
          <li onClick={() => setIsMobileNavOpen(false)}>
            <Link to="/donate" className="lg:py-7 inline-block cursor-pointer">
              Donate
            </Link>
          </li>
          {notUserLinksElements}
          {avatarElement}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
