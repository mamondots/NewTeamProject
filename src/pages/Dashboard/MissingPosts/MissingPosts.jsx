import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BiEdit, BiRedo, BiTrash } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MissingPosts = () => {
  const [missingAnimals, setMissingAnimals] = useState([]);
  const [missingAnimalsLoading, setMissingAnimalsLoading] = useState(true);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [postDeleteLoading, setPostDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const getMissingPosts = () => {
    axios.get("https://litl-pal-server-margubtech-gmailcom.vercel.app/api/missing-posts").then((data) => {
      setMissingAnimals(data.data);
      setMissingAnimalsLoading(false);
    });
  };

  useEffect(() => {
    getMissingPosts();
  }, []);

  const changeStatus = (id, status) => {
    setStatusUpdateLoading(true);
    axios
      .patch(`https://litl-pal-server-margubtech-gmailcom.vercel.app/api/posts/${id}?postStatus=${status}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          getMissingPosts();
        }
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
              getMissingPosts();
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
      <h2 className="text-center text-2xl font-semibold mb-5">Missing Posts</h2>

      {missingAnimalsLoading ? (
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
                {missingAnimals.map(
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
                            <div className="font-bold" title={title}>
                              {title.substr(0, 20) +
                                (title.length > 20 ? "..." : "")}
                            </div>
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
                        <button className="btn btn-circle  btn-error">
                          <BiTrash
                            size={20}
                            disabled={postDeleteLoading}
                            onClick={() => deletePost(_id)}
                          />
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

export default MissingPosts;
