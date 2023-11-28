import React, { useEffect, useState } from "react";
import AnimalCard from "../../../Components/AnimalCard/AnimalCard";

const ReadyToAdopt = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://litl-pal-server-margubtech-gmailcom.vercel.app/api/adoptable-posts?postStatus=1,2")
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="my-16 container mx-auto space-y-10 p-5 lg:p-0">
      <h2 className="text-center text-xl md:text-2xl lg:text-3xl uppercase font-semibold text-gray-800 flex justify-center items-center gap-3">
        <div className="w-5 h-[2px] bg-[#FC7676]"></div>
        <p className="w-fit">Ready for adoption</p>
        <div className="w-5 h-[2px] bg-[#FC7676]"></div>
      </h2>
      {loading ? (
        <div className="text-center">
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {animals.map((animal) => (
            <AnimalCard animal={animal} key={animal._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadyToAdopt;
