import React from "react";
import AnimalCard from "../../../Components/AnimalCard/AnimalCard";
import { useState } from "react";
import { useEffect } from "react";

const Dogs = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://litl-pal-server-margubtech-gmailcom.vercel.app/api/adoptable-posts?animaltype=dog&postStatus=1,2")
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="bg-amber-50">
      <div className="container mx-auto space-y-10 py-10 px-5 lg:px-0">
        <h2 className="text-center text-xl md:text-2xl lg:text-3xl uppercase font-semibold text-gray-800 flex justify-center items-center gap-3">
          <div className="w-5 h-[2px] bg-[#FC7676]"></div>
          <p className="w-fit">Dogs</p>
          <div className="w-5 h-[2px] bg-[#FC7676]"></div>
        </h2>
        {loading ? (
          <div className="text-center">
            <span className="loading loading-spinner text-amber-500"></span>
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {animals.map((animal) => (
              <AnimalCard animal={animal} key={animal._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dogs;
