import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BiEdit, BiRedo, BiTrash } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdoptionPosts = () => {
  const [adoptableAnimals, setAdoptableAnimals] = useState([]);
  const [adoptableAnimalsLoading, setAdoptableAnimalsLoading] = useState(true);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [postDeleteLoading, setPostDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const getAdoptablePosts = () => {
    axios.get("https://litl-pal-server-margubtech-gmailcom.vercel.app/api/adoptable-posts").then((data) => {

      setAdoptableAnimals(data.data);
      setAdoptableAnimalsLoading(false);
    }).catch(err => {
      console.log(err.message);
      setAdoptableAnimalsLoading(false)
    });
  };

  useEffect(() => {
    getAdoptablePosts();
  }, []);

  const changeStatus = (id, status) => {
    setStatusUpdateLoading(true);
    axios
      .patch(`https://litl-pal-server-margubtech-gmailcom.vercel.app/api/posts/${id}?postStatus=${status}`)
      .then((res) => {
        if(res.data.modifiedCount) {
          getAdoptablePosts();
        }
        setStatusUpdateLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setStatusUpdateLoading(false);
      });
  };

  const deletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setPostDeleteLoading(true);
        axios
          .delete(`https://litl-pal-server-margubtech-gmailcom.vercel.app/api/posts/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Post has been deleted.",
                icon: "success",
              });
              getAdoptablePosts();
            }
            setPostDeleteLoading(false);
          })
          .catch((e) => {
            console.log(e.message);
            setPostDeleteLoading(false);
          });
      }
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-center text-2xl font-semibold mb-5">
        Adoption Posts
      </h2>

      {adoptableAnimalsLoading ? (
        <div className="text-center flex justify-center items-center">
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Title / Age / Type</th>
                  <th>Color</th>
                  <th>Gender</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adoptableAnimals.map(
                  ({
                    _id,
                    image,
                    title,
                    age,
                    animalType,
                    color,
                    gender,
                    postDate,
                    postStatus,
                  }) => (
                    <tr key={_id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{title}</div>
                            <div className="text-sm opacity-50">{`${age} months old ${animalType}`}</div>
                          </div>
                        </div>
                      </td>
                      <td>{color}</td>
                      <td>{gender}</td>
                      <td>{new Date(postDate).toDateString()}</td>
                      <td>
                        <button
                          className={`btn ${
                            parseInt(postStatus) ? "btn-success" : "btn-error"
                          } btn-sm`}
                          title="click again to toggle the status"
                          onClick={() =>
                            changeStatus(_id, parseInt(postStatus) ? 0 : 1)
                          }
                          disabled={statusUpdateLoading}
                        >
                          <BiRedo size={20} />
                          {parseInt(postStatus) ? "Approved" : "Declined"}
                        </button>
                      </td>
                      <td className="space-x-2">
                        <button
                          className="btn btn-circle  btn-error"
                          disabled={postDeleteLoading}
                          onClick={() => deletePost(_id)}
                        >
                          <BiTrash size={20} />
                        </button>
                        <button
                          className="btn btn-circle"
                          onClick={() => navigate(`/adoptable-animals/${_id}`)}
                        >
                          <BsFillEyeFill size={20} />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionPosts;
