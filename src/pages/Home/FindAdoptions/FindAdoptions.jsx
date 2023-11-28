import React from "react";
import wavesImg from "../../../assets/waves.svg";
import tiltImg from "../../../assets/tilt.svg";
import {BiSolidDog} from 'react-icons/bi'
import {GiCat} from 'react-icons/gi'
import { useNavigate } from "react-router-dom";
const FindAdoptions = () => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-[#E66777]  mt-20">
      <img
        src={wavesImg}
        alt=""
        className="absolute w-full top-0 hidden lg:block"
      />
      <img
        src={tiltImg}
        alt=""
        className="absolute w-full top-0 block lg:hidden h-8"
      />
      <div className="py-20 container mx-auto">
        <h2 className="text-center text-3xl uppercase font-semibold text-white mb-5">
          Find Adoptions
        </h2>
        <div className="flex justify-center items-center flex-wrap gap-10">
            <div className="flex flex-col items-center gap-3 cursor-pointer" onClick={() => navigate("/search", {state: {animalType: 'dog'}})}>
                <BiSolidDog size={150} className="hover:scale-110 bg-white rounded-full p-3 text-gray-800 hover:bg-[#4296AF] hover:text-white transition-all"/>
                <span className="text-xl text-white">Dog</span>
            </div>
            <div className="flex flex-col items-center gap-3 cursor-pointer" onClick={() => navigate("/search", {state: {animalType: 'cat'}})}>
                <GiCat size={150} className="hover:scale-110 bg-white rounded-full p-3 text-gray-800 hover:bg-[#4296AF] hover:text-white transition-all"/>
                <span className="text-xl text-white">Cat</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FindAdoptions;
