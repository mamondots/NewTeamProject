import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const SinglePetView = () => {
  const navigate = useNavigate();
  const [pet, setPet] = useState({});
  const [loading, setLoading] = useState(true);
  const [adoptionRequestLoading, setAdoptionRequestLoading] = useState(false);
  const { user, loading: userLoading } = useContext(AuthContext);
  const { id } = useParams();

  const fetchSingleAdoptablePost = () => {
    axios
      .get(
        `https://litl-pal-server-margubtech-gmailcom.vercel.app/api/adoptable-posts/${id}`
      )
      .then((res) => {
        setPet(res.data[0]);
        console.log(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e.message));
  };
  useEffect(() => {
    fetchSingleAdoptablePost();
  }, [id]);

  const handleAdoptionRequest = (id) => {
    if (!user) navigate("/login");
    setAdoptionRequestLoading(true);
    axios
      .patch(`http://localhost:5000/api/posts/${id}?postStatus=2`, {
        email: user.email,
      })
      .then((res) => {
        if (res.data) {
          Swal.fire("Success!", "Your request is submitted!", "success");
          fetchSingleAdoptablePost();
        }
      })
      .catch((err) => {
        console.log(err.message);
        setAdoptionRequestLoading(false);
      });
  };
  return (
    <div className="min-h-screen">
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <>
          <div className="bg-gray-700 h-72 flex justify-center items-end">
            <img
              src={pet.image}
              alt={pet.title}
              className="w-52 h-52 rounded-full object-cover -mb-16"
            />
          </div>
          <div className="container mx-auto py-10 px-5 lg:px-0">
            <h2 className="text-center text-3xl font-bold mt-8 mb-3">
              {pet.title}
            </h2>
            <h3 className="text-center flex justify-center items-center gap-2 mb-3">
              <IoLocationSharp size={20} className="text-error" />
              <span>{pet.location}</span>
            </h3>
            <h4 className="text-center mb-5">
              <span>Posted on : </span>
              <span className="font-semibold">
                {new Date(pet.postDate).toDateString()}
              </span>
            </h4>
            <div className="text-center">
              <button
                className="btn btn-success"
                disabled={adoptionRequestLoading || userLoading || pet?.requestedBy?.find((item) => item.email === user?.email)}
                onClick={() => handleAdoptionRequest(pet._id)}
              >
                Request Adoption
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
              <div className="border-2 border-error rounded-lg text-error p-5 flex flex-col gap-3 justify-center text-center hover:bg-error hover:text-white transition-all hover:scale-105 duration-300">
                <span>Gender</span>
                <span className="text-5xl uppercase font-bold">
                  {pet.gender}
                </span>
              </div>
              <div className="border-2 border-error rounded-lg text-error p-5 flex flex-col gap-3 justify-center text-center hover:bg-error hover:text-white transition-all hover:scale-105 duration-300">
                <span>Age (months)</span>
                <span className="text-5xl uppercase font-bold">{pet.age}</span>
              </div>
              <div className="border-2 border-error rounded-lg text-error p-5 flex flex-col gap-3 justify-center text-center hover:bg-error hover:text-white transition-all hover:scale-105 duration-300">
                <span>Color</span>
                <span className="text-5xl uppercase font-bold">
                  {pet.color}
                </span>
              </div>
              <div className="border-2 border-error rounded-lg text-error p-5 flex flex-col gap-3 justify-center text-center hover:bg-error hover:text-white transition-all hover:scale-105 duration-300">
                <span>Trained</span>
                <span className="text-5xl uppercase font-bold">
                  {pet.training == 1 ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
          <div className="container mx-auto">
            <h4 className="font-bold text-3xl text-gray-800 mb-5 lg:mb-0 text-center">
              Pet Description
            </h4>
            <p className="mt-3">{pet.postDescription}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 my-10">
            <div className="w-full h-full text-center flex justify-center items-center border-r">
              <h4 className="font-bold text-3xl text-gray-800 mb-5 lg:mb-0">
                Owner Details
              </h4>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <img
                src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt="user image"
                className="w-48 h-48 rounded-full object-cover"
              />
              <p className="">{pet.postUserEmail}</p>
              <div className="space-x-3">
                <a href={"mailto:" + pet.postUserEmail}>
                  <button className="btn btn-circle btn-outline">
                    <AiOutlineMail size={25} />
                  </button>
                </a>
                <button className="btn btn-circle btn-outline">
                  <BsChatDots size={25} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePetView;
