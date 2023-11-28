import React from "react";
import adoptVector from "../../../assets/rsz_cute-dog-playing-box-cartoon_138676-2305__1_-removebg-preview.png";
import volunteerImage from "../../../assets/volunteer.png";
import donateImage from "../../../assets/donate.png";

const WhatYouCanDo = () => {
  return (
    <div>
      <div className="my-16 max-w-3xl mx-auto space-y-3 p-2 lg:p-0">
      <h2 className="text-center text-xl md:text-2xl lg:text-3xl uppercase font-semibold text-gray-800 flex justify-center items-center gap-3">
        <div className="w-5 h-[2px] bg-[#FC7676]"></div>
        <p className="w-fit">What you can do</p>
        <div className="w-5 h-[2px] bg-[#FC7676]"></div>
      </h2>
        <p className="text-center text-gray-600">
          Make a positive impact with Little Pal! Adopt animals to give them a
          loving home, donate to support our mission, and volunteer to help care
          for our furry friends. Together, we can create a brighter future for
          animals in need.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 px-2 lg:p-0">
        <div className="flex flex-col justify-center items-center gap-3 bg-[#EC9724] p-3">
          <img src={adoptVector} alt="" className="wauto h-52 object-cover" />
          <p className="text-3xl font-bold text-white uppercase text-right relative z-10">
            Adopt
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 bg-[#4296AF] p-3">
          <img src={volunteerImage} alt="" className="w-auto h-52 object-cover" />
          <p className="text-3xl font-bold text-white uppercase text-right relative z-10">
            Volunteer
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 bg-green-400 p-3">
          <img src={donateImage} alt="" className="w-auto h-52 object-cover" />
          <p className="text-3xl font-bold text-white uppercase text-right relative z-10">
            Donate
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatYouCanDo;
