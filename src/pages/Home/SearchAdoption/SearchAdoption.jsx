import React from "react";
import { BsSearchHeart } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import adoptionImage from "../../../assets/adoption.webp";
import Button from "../../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

const SearchAdoption = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const color = form.color.value;
    const age = form.age.value;
    const animalType = form.animalType.value;
    navigate("/search", {state: {location, color, age, animalType}})
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 shadow-lg">
      <div className="p-5 my-8">
        <h1 className="font-bold uppercase text-xl md:text-3xl text-center mb-5 w-fit mx-auto text-[#E66777] px-5 py-2 rounded-md">
          Search Companion
        </h1>
        <form className="flex flex-col items-center gap-5 rounded-full mx-auto p-2 xl:max-w-[70%]" onSubmit={handleSubmit}>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter your location"
            className="px-6 py-3 rounded-full w-full outline-none bg-transparent border focus:border-[#E66777]"
          />
          <input
            type="text"
            name="color"
            id="color"
            placeholder="Enter your pet's color"
            className="px-6 py-3 rounded-full w-full outline-none bg-transparent border focus:border-[#E66777]"
          />
          <select
            name="animalType"
            className="select select-bordered rounded-full border w-full focus:outline-none focus:border-[#E66777]"
          >
            <option selected>Cat</option>
            <option>Dog</option>
          </select>
          <select
            name="age"
            className="select select-bordered rounded-full border w-full focus:outline-none focus:border-[#E66777]"
          >
            <option selected value={0}>less than 5 months</option>
            <option value={1}>more than 5 months</option>
          </select>

          <Button className="flex items-center gap-3 text-white">
            <BsSearchHeart size={20} /> <span>Search</span>
          </Button>
        </form>
      </div>
      <div
        className="w-full relative"
        style={{ backgroundImage: `url("${adoptionImage}")` }}
      >
        <div className="absolute w-full h-full bg-black bg-opacity-80 z-0"></div>
        <div className="relative z-1 p-5 my-8 text-center space-y-5 flex flex-col justify-center h-full">
          <h2 className="text-white font-bold uppercase text-xl md:text-3xl">
            Post Adoption
          </h2>
          <p className="text-white font-thin leading-8">
            Find Loving Homes for Your Beloved Pets! Click 'Post Adoption' and
            help your little pals connect with caring individuals eager to
            provide them a forever home. Your small action can make a world of
            difference for your furry friends. Let's bring families and pets
            together!
          </p>
          <Button
            className="flex items-center gap-3 text-white mx-auto"
            eventHandler={() => navigate("/create-adoption-post")}
          >
            <AiOutlinePlus size={20} />
            <span>Post Adoption</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchAdoption;
