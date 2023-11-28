import { BsFillHouseHeartFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidColor } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { FaCat } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import './AnimalCard.css'
import axios from "axios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
const AnimalCard = ({ animal, lost }) => {
  const [wishlist, setWishlist] = useState([]);

  const { user } = useContext(AuthContext)

  const handleAddToWish = () => {
    // send wishlist to the backend
    const title = animal.title;
    const missingDate = animal.missingDate;
    const color = animal.color;
    const img = animal.image;
    const gender = animal.gender;
    const wishInfo = {
      title,
      missingDate,
      color,
      img,
      gender,
    };
    axios
      .post("https://litl-pal-server-margubtech-gmailcom.vercel.app/api/user-wishlist", wishInfo)
      .then((data) => {
        if (data.data.insertedId) {
          Swal.fire("Save For Later");
        }
      });
  };
  return (
    <div className=" cursor-pointer full-card">
      <div className="relative ">
        <img
          className="rounded-t-xl h-[300px] w-full object-cover object-center"
          src={animal?.image}
          alt={animal?.title}
        />
        <div
          onClick={handleAddToWish}
          className="wish-btn px-3 py-3 shadow-md border hover:bg-[#434760]  duration-300 rounded-full bg-[#FC7676] text-white text-xl"
        >
          <p>
            <AiFillHeart></AiFillHeart>
          </p>
        </div>
        <span className="absolute bottom-5 right-5 text-white text-[14px] bg-[#FC7676] px-2 py-1 rounded capitalize">
          {animal?.animalType}
        </span>
      </div>
      <div className="p-4 border-s-2 border-e-2 border-b-2 rounded-b-xl bg-white">
        <h1 className="text-[25px] text-[#292A35] font-semibold">
          {animal?.title}
        </h1>
        {/* Show maximum 100 characters. If there are more than 100 characters then add ... at the end of the text */}
        <p className="mt-1 text-[#474747] text-[16px]">
          {animal?.postDescription?.slice(0, 105)}
          {animal?.postDescription?.length > 105 ? " ..." : ""}
        </p>

        <hr className="my-3" />

        <div className="flex flex-col gap-2">
          {!lost && (
            <div className="flex gap-4 items-center">
              <div>
                <BsFillHouseHeartFill className="text-[#C5C5C5] text-[28px]" />
              </div>
              <div className="text-[14px]">
                <h3 className="text-[#292A35] font-semibold">House-trained</h3>
                <h5 className="text-[#474747]">
                  {animal?.training === 1 ? "Yes" : "No"}
                </h5>
              </div>
            </div>
          )}

          <div className="flex gap-4 items-center">
            <div>
              <FaLocationDot className="text-[#C5C5C5] text-[28px]" />
            </div>
            <div className="text-[14px]">
              <h3 className="text-[#292A35] font-semibold">Location</h3>
              <h5 className="text-[#474747]">{animal?.location}</h5>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div>
              <FaCat className="text-[#C5C5C5] text-[28px]" />
            </div>
            <div className="text-[14px]">
              <h3 className="text-[#292A35] font-semibold">Gender</h3>
              <h5 className="text-[#474747] capitalize">{animal?.gender}</h5>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div>
              <BiSolidColor className="text-[#C5C5C5] text-[28px]" />
            </div>
            <div className="text-[14px]">
              <h3 className="text-[#292A35] font-semibold">Color</h3>
              <h5 className="text-[#474747] capitalize">{animal?.color}</h5>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Link to={`/adoptable-animals/${animal?._id}`}>
            <button className="text-white px-4 py-2 sm:px-6 sm:py-4 text-[15px] hover:bg-[#434760] bg-[#FC7676] transition-color duration-500 rounded-xl w-full">
              Adopt the pet
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
