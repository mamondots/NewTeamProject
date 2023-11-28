import React, { useContext, useRef } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

import demoUser from "../../../assets/member01.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUserInfo } = useContext(AuthContext);
  const [districts, setDistricts] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [profileDataLoading, setProfileDataLoading] = useState(true);
  const [profileDataUpdateLoading, setProfileDataUpdateLoading] =
    useState(false);
  const modalRef = useRef(null);

  const getProfileData = () => {
    setProfileDataLoading(true)
    axios
      .get(`http://localhost:5000/user/profile?email=${user.email}`)
      .then((res) => {
        setProfileData(res.data);
        setProfileDataLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setProfileDataLoading(false);
      });
  }

  useEffect(() => {
    getProfileData();

    fetch("/public/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const allDistricts = data.districts;
        allDistricts.sort();
        console.log(data);
        setDistricts(allDistricts);
      });
  }, []);

  const openModal = () => {
    modalRef.current.showModal();
  };
  const closeModal = () => {
    modalRef.current.close();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileDataUpdateLoading(true);
    const updateInfo = {};
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.district.value;
    const file = e.target.file.files[0];

    updateInfo.email = email;
    if (name !== profileData.user.name) updateInfo.name = name;
    if (address !== profileData.user.address) updateInfo.address = address;
    if (phone !== profileData.user.phone) updateInfo.phone = phone;

    // upload image
    if (file) {
      const apiKey = import.meta.env.VITE_IMG_APIKEY;
      const formData = new FormData();
      formData.append("image", file);

      const response1 = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const response2 = await response1.json();

      if (response2.status === 200) {
        const imageUrl = response2.data.display_url;
        updateInfo.photo = imageUrl;
      }
    }

    const res = await axios.patch(
      "http://localhost:5000/user/profile",
      updateInfo
    );
    if (name || updateInfo.photo) await updateUserInfo(name, updateInfo.photo);
    setProfileDataUpdateLoading(false);
    closeModal();
    if (res.data.modifiedCount) {
        getProfileData()
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile Updated Successfully!",
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No changes made!",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  if (profileDataLoading)
    return (
      <div className="text-center h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );

  return (
    <div className="p-5 lg:px-12 lg:pt-0">
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
        ref={modalRef}
      >
        <div className="modal-box">
          <form className="p-5 lg:p-0 space-y-5" onSubmit={handleUpdateProfile}>
            <h2 className="text-center text-2xl font-semibold mb-5">
              Edit Profile
            </h2>
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-gray-500 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="py-3 px-6 w-full border rounded-md outline-none"
                defaultValue={profileData.user.name}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-gray-500 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="py-3 px-6 w-full border rounded-md outline-none text-gray-400"
                value={profileData.user.email}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="file" className="text-gray-500 mb-2">
                Photo URL
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="file-input file-input-bordered file-input-error w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="phone" className="text-gray-500 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                className="py-3 px-6 w-full border rounded-md outline-none"
                defaultValue={profileData.user.phone}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="district" className="text-gray-500 mb-2">
                District
              </label>
              <select
                className="py-3 px-6 w-full border rounded-md outline-none cursor-pointer"
                id="district"
                name="district"
              >
                {districts.map((district) => {
                  return (
                    <option
                      value={district}
                      key={district}
                      selected={
                        district.toLowerCase() ===
                        profileData.user.address.toLowerCase()
                      }
                    >
                      {district}
                    </option>
                  );
                })}
              </select>
            </div>
            <button type="submit" className="btn btn-error w-full">
              {profileDataUpdateLoading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="border px-6 py-6 text-center rounded-md">
          <img
            src={profileData.user.photo || demoUser}
            alt=""
            className="rounded-md max-w-[200px] max-h-[200px] object-cover mx-auto"
          />
          <button
            className="mt-4 px-6 py-3 w-full bg-[#FC7676] rounded-md text-white cursor-pointer hover:bg-[#4B5563] duration-300"
            onClick={openModal}
          >
            Edit profile
          </button>
        </div>

        <div className="border rounded-md px-6 py-6 w-full mt-5 lg:mt-0">
          <h2 className="text-xl font-bold">
            {profileData.user.name || "User"}
          </h2>
          <p className="text-[#4B5563] py-1">Member</p>
          <div className=" text-gray-500">
            <p>Email : {profileData.user.email}</p>
            <p>Address : {profileData.user.address}</p>
            <p>Phone : {profileData.user.phone}</p>
          </div>

          <div className="flex items-center space-x-2 mt-4 cursor-pointer">
            <Link to="/adoptable-animals">
              <p className="px-4 py-2 border bg-[#4B5563] text-white hover:bg-[#FC7676] duration-300">
                Adopt a Pet
              </p>
            </Link>
            <Link to="/quiz">
              <p className="px-4 py-2 border bg-[#4B5563] text-white hover:bg-[#FC7676] duration-300">
                Take a quiz
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-xl font-bold">
          {user.displayName || "User"}{" "}
          <span className="text-[#FC7676]">Stats</span>
        </h2>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 py-4 cursor-pointer">
          <div className="bg-[#4B5563] text-center py-8 text-white border-t-4 border-amber-500 rounded">
            <h2 className="text-xl py-2">Total Adoption Posts</h2>
            <p>
              <span className="text-amber-500 text-3xl">
                {profileData.adoptionCount}
              </span>{" "}
            </p>
          </div>

          <div className="bg-[#4B5563] text-center py-8 text-white border-t-4 border-[#FC7676] rounded">
            <h2 className="text-xl py-2">Total Missing Posts</h2>
            <p>
              {" "}
              <span className="text-[#FC7676] text-3xl">
                {profileData.missingCount}
              </span>{" "}
            </p>
          </div>

          <div className="bg-[#4B5563] text-center py-8 text-white border-t-4 border-green-500 rounded">
            <h2 className="text-xl py-2">Total Donations</h2>
            <p>
              <span className="text-green-500 text-3xl">
                $ {profileData.donationAmount}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
