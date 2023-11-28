import { useState } from "react";
import { Link } from "react-router-dom";
import AnimalCard from "../../Components/AnimalCard/AnimalCard";
import { useEffect } from "react";
import axios from "axios";

const AdoptableAnimals = () => {
  const [allAdoptableAnimals, setAllAdoptableAnimals] = useState([]);
  const [adoptableAnimals, setAdoptableAnimals] = useState([]);
  const [selectedAnimals, setSelectedAnimals] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/adoptable-posts?postStatus=1,2").then((data) => {
      setAllAdoptableAnimals(data.data);
      setAdoptableAnimals(data.data);
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
          <Link to="/adoptable-animals">Adopt a Pet</Link>
        </span>
      </div>

      <h1 className="mt-2 text-[56px] text-[#292A35] font-semibold">
        Adopt a Pet
      </h1>

      <div className="mt-6">
        <span
          onClick={() => {
            setSelectedAnimals("all");
            setAdoptableAnimals(allAdoptableAnimals);
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
            const filteredAnimals = allAdoptableAnimals.filter(
              (animal) => animal.animalType === "cat"
            );
            setAdoptableAnimals(filteredAnimals);
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
            const filteredAnimals = allAdoptableAnimals.filter(
              (animal) => animal.animalType === "dog"
            );
            setAdoptableAnimals(filteredAnimals);
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
          {adoptableAnimals.map((animal) => {
            return <AnimalCard key={animal._id} animal={animal} lost={false} />;
          })}
        </div>
      )}
    </div>
  );
};

export default AdoptableAnimals;
