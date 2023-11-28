import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ReunionedAnimals = () => {
  const [missingAnimals, setMissingAnimals] = useState([]);
  const [missingAnimalsLoading, setMissingAnimalsLoading] = useState(true);

  const getMissingPosts = () => {
    axios
      .get(
        "https://litl-pal-server-margubtech-gmailcom.vercel.app/api/missing-posts?postStatus=3"
      )
      .then((data) => {
        setMissingAnimals(data.data);
        setMissingAnimalsLoading(false);
      });
  };

  useEffect(() => {
    getMissingPosts();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-center text-2xl font-semibold mb-5">
        <span className="text-green-500">Successfully</span> Reunioned Animals
      </h2>

      {missingAnimalsLoading ? (
        <div className="text-center flex justify-center items-center">
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <>
          {missingAnimals.length ? (
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
                      <th>Location</th>
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
                        location,
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
                          <td>{location}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="h-50 flex justify-center items-center text-gray-400">
              <span>No Successful Reunioned Animal Found</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReunionedAnimals;
