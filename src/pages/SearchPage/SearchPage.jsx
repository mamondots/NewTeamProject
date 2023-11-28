import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AnimalCard from "../../Components/AnimalCard/AnimalCard";
import Button from "../../Components/Button/Button";
import { BsSearchHeart } from "react-icons/bs";

const SearchPage = () => {
  const location = useLocation();
  const state = location.state;
  const [posts, setPosts] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState(state?.location || "");
  const [searchAge, setSearchAge] = useState(state?.age || "");
  const [searchColor, setSearchColor] = useState(state?.color || "");
  const [searchPostType, setSearchPostType] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [searchAnimalType, setSearchAnimalType] = useState(
    state?.animalType?.toLowerCase() || ""
  );
  useEffect(() => {
    console.log(searchLocation,
        searchAge,
        searchColor,
        searchPostType,
        searchGender,
        searchAnimalType)
    setSearchLoading(true);
    axios
      .get(
        `http://localhost:5000/api/search?location=${searchLocation}&age=${searchAge}&color=${searchColor}&animalType=${searchAnimalType}&postType=${searchPostType}&gender=${searchGender}`
      )
      .then((res) => {
        const posts = res.data;
        setPosts(posts);
        console.log(posts)
        setSearchLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setSearchLoading(false);
      });
  }, [
    searchLocation,
    searchAge,
    searchColor,
    searchAnimalType,
    searchPostType,
    searchGender
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const petLocation = form.location.value;
    const color = form.color.value;
    const age = form.age.value;
    const animalType = form.animalType.value;
    const postType = form.postType.value;
    const gender = form.gender.value;
    setSearchLocation(petLocation);
    setSearchColor(color);
    setSearchAge(age);
    setSearchAnimalType(animalType);
    setSearchPostType(postType);
    setSearchGender(gender)
  };

  return (
    <div className="my-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="text-[15px] text-[#45455B]">
        <span className="hover:underline">
          <Link to="/">Home</Link>
        </span>
        <span className="text-[#FC7676] mx-2">—</span>
        <span className="hover:underline">
          <Link to="/search">Search</Link>
        </span>
      </div>

      <h1 className="mt-2 text-[56px] text-[#292A35] font-semibold">Search</h1>

      <div className="mt-3 grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5">
        <form
          className="flex flex-col items-center gap-5 rounded-full "
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter your location"
            defaultValue={searchLocation}
            className="px-6 py-3 rounded-full w-full outline-none bg-transparent border focus:border-[#E66777]"
          />
          <input
            type="text"
            name="color"
            id="color"
            placeholder="Enter your pet's color"
            defaultValue={searchColor}
            className="px-6 py-3 rounded-full w-full outline-none bg-transparent border focus:border-[#E66777]"
          />
          <select
            name="animalType"
            defaultValue={searchAnimalType}
            className="select select-bordered rounded-full border w-full focus:outline-none focus:border-[#E66777]"
          >
            <option selected disabled value="">
              Animal Type
            </option>
            <option selected value="cat">
              Cat
            </option>
            <option value="dog">Dog</option>
          </select>
          <select
            name="gender"
            className="select select-bordered rounded-full border w-full focus:outline-none focus:border-[#E66777]"
          >
            <option selected disabled value="">
              Gender
            </option>
            <option value="male">
              Male
            </option>
            <option value="female">Female</option>
          </select>
          <select
            name="age"
            defaultValue={searchAge}
            className="select select-bordered rounded-full border w-full focus:outline-none focus:border-[#E66777]"
          >
            <option selected disabled value="">
              Age
            </option>
            <option selected value={0}>
              less than 5 months
            </option>
            <option value={1}>more than 5 months</option>
          </select>
          <select
            name="postType"
            className="select select-bordered rounded-full border w-full focus:outline-none focus:border-[#E66777]"
          >
            <option selected disabled value="">
              Post Type
            </option>
            <option value="adoption">
              Adoption
            </option>
            <option value="lost">Missing</option>
          </select>

          <Button className="flex items-center gap-3 text-white">
            <BsSearchHeart size={20} /> <span>Search</span>
          </Button>
        </form>
        {searchLoading ? (
          <div className="text-center col-span-3">
            <span className="loading loading-spinner text-error"></span>
          </div>
        ) : (
          <div className="col-span-3">
            {posts.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {posts.map((animal) => {
                  return (
                    <AnimalCard key={animal._id} animal={animal} lost={false} />
                  );
                })}
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center col-span-3 opacity-50">
                <span>No Results Found</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
