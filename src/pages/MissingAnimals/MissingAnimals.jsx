import { useState } from "react";
import { Link } from "react-router-dom";
import AnimalCard from "../../Components/AnimalCard/AnimalCard";
import { useEffect } from "react";
import axios from "axios";

const MissingAnimals = () => {
  const [allMissingAnimals, setAllMissingAnimals] = useState([]);
  const [missingAnimals, setMissingAnimals] = useState([]);
  const [selectedAnimals, setSelectedAnimals] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://litl-pal-server-margubtech-gmailcom.vercel.app/api/missing-posts?postStatus=1").then((data) => {
      setAllMissingAnimals(data.data);
      setMissingAnimals(data.data);
      setSelectedAnimals("all");
      setLoading(false);
    });
  }, []);

  return (
    <div className="my-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="text-[15px] text-[#45455B]">
        <span className="hover:underline">
          <Link to="/">Home</Link>
        </span>
        <span className="text-[#FC7676] mx-2">—</span>
        <span className="hover:underline">
          <Link to="/lost-animals">Lost Pets</Link>
        </span>
      </div>

      <h1 className="mt-2 text-[56px] text-[#292A35] font-semibold">
        Lost Pets
      </h1>

      <div className="mt-6">
        <span
          onClick={() => {
            setSelectedAnimals("all");
            setMissingAnimals(allMissingAnimals);
          }}
          className={`${
            selectedAnimals === "all" ? "text-[#FC7676]" : "text-[#101026]"
          } text-[15px] hover:text-[#3F3D5C] transition-color duration-500 cursor-pointer`}
        >
          All
        </span>

        <span className="text-[#FC7676] mx-2 text-[20px]">•</span>

        <span
          onClick={() => {
            setSelectedAnimals("cats");
            const filteredAnimals = allMissingAnimals.filter(
              (animal) => animal.animalType === "cat"
            );
            setMissingAnimals(filteredAnimals);
          }}
          className={`${
            selectedAnimals === "cats" ? "text-[#FC7676]" : "text-[#101026]"
          } text-[15px] hover:text-[#3F3D5C] transition-color duration-500 cursor-pointer`}
        >
          Cats
        </span>

        <span className="text-[#FC7676] mx-2 text-[20px]">•</span>

        <span
          onClick={() => {
            setSelectedAnimals("dogs");
            const filteredAnimals = allMissingAnimals.filter(
              (animal) => animal.animalType === "dog"
            );
            setMissingAnimals(filteredAnimals);
          }}
          className={`${
            selectedAnimals === "dogs" ? "text-[#FC7676]" : "text-[#101026]"
          } text-[15px] hover:text-[#3F3D5C] transition-color duration-500 cursor-pointer`}
        >
          Dogs
        </span>
      </div>

      {loading ? (
        <div className="text-center">
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {missingAnimals.map((animal) => {
            return <AnimalCard key={animal._id} animal={animal} lost={true} />;
          })}
        </div>
      )}
    </div>
  );
};

export default MissingAnimals;
