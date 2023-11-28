import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const MissingPost = () => {
  const { user } = useContext(AuthContext);
  const [districts, setDistricts] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setPostLoading(true);

    const title = data.title;
    const postType = "lost";
    const missingDate = data.missingDate;
    const color = data.color;
    const age = parseInt(data.age);
    const postDescription = data.description;
    const gender = data.gender;
    const training = parseInt(data.training);
    const location = data.location;
    const animalType = data.animalType;

    let image;

    // upload image
    const file = data.photoURL[0];

    if (file) {
      const formData = new FormData();
      const apiKey = import.meta.env.VITE_IMG_APIKEY;

      formData.append("image", file);

      fetch("https://api.imgbb.com/1/upload?key=" + apiKey, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            const imageUrl = data.data.url;
            image = imageUrl;

            // make the post here
            const postInfo = {
              title,
              postType,
              missingDate,
              color,
              age,
              postDescription,
              gender,
              training,
              location,
              animalType,
              image,
              postDate: Date.now(),
              postStatus: 0,
              postUserEmail: user.email,
              // post-user-id missing
            };

            // send postInfo to the backend
            axios
              .post("https://litl-pal-server-margubtech-gmailcom.vercel.app/api/create-post", postInfo)
              .then((data) => {
                if (data.data.insertedId) {
                  Swal.fire(
                    "Congratulations!",
                    "Post added successfully.",
                    "success"
                  );
                }
              });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Image Upload Failed",
              footer: data.message,
            });
          }
          setPostLoading(false);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Image Upload Failed!",
            footer: error,
          });
          setPostLoading(false);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No file selected for upload.",
      });
      setPostLoading(false);
      return;
    }
  };

  // Load all districts and store them in lexicographical order
  useEffect(() => {
    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => {
        const allDistricts = data.districts;
        allDistricts.sort();
        setDistricts(allDistricts);
      });
  }, []);

  return (
    <div className="my-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <h1 className="mt-2 text-[32px] text-[#292A35] font-semibold text-center">
        Add Information About Your Missing Friend
      </h1>

      <div className="border lg:mx-80 my-12 rounded">
        <div className="text-center bg-[#272633] py-4 text-white">
          <h2>Information of the Pet</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-4">
          <div className="flex flex-col space-y-1">
            <label>
              Add Title <span className="text-xl text-[#F29500] py-4">*</span>
            </label>
            <input
              {...register("title", { required: true })}
              className="py-2 px-4 border rounded"
              type="text"
              placeholder="Enter missing title"
            />
            {errors.title && (
              <span className="text-[red] py-1">Title is required</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label>
              Pet Image <span className="text-xl text-[#F29500] py-4">*</span>
            </label>
            <input
              {...register("photoURL", { required: true })}
              className="py-2 px-4 border rounded"
              type="file"
            />
            {errors.photoURL && (
              <span className="text-[red] py-1">Photo is required</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label>
              Pet Type <span className="text-xl text-[#F29500] py-4">*</span>
            </label>
            <select
              {...register("animalType", { required: true })}
              className="py-2 px-4 border rounded"
            >
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
            </select>
            {errors.animalType && (
              <span className="text-[red] py-1">Pet type is required</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label>
              Pet Color <span className="text-xl text-[#F29500] py-4">*</span>
            </label>
            <input
              {...register("color", { required: true })}
              className="py-2 px-4 border rounded"
              type="text"
              placeholder="Enter pet color"
            />
            {errors.color && (
              <span className="text-[red] py-1">Color is required</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label>
              Pet Age (in month){" "}
              <span className="text-xl text-[#F29500] py-4">*</span>
            </label>
            <input
              min="0"
              max="250"
              {...register("age", { required: true })}
              className="py-2 px-4 border rounded"
              type="number"
              placeholder="Enter pet age"
            />
            {errors.age && (
              <span className="text-[red] py-1">Age is required</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label>
              Pet Gender <span className="text-xl text-[#F29500] py-4">*</span>
            </label>
            <select
              {...register("gender", { required: true })}
              className="py-2 px-4 border rounded"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <span className="text-[red] py-1">Gender is required</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label>
              Missing Location{" "}
              <span className="text-xl text-[#F29500] py-4">*</span>
            </label>
            <select
              {...register("location", { required: true })}
              className="py-2 px-4 border rounded"
            >
              {districts.map((district) => {
                return (
                  <option value={district} key={district}>
                    {district}
                  </option>
                );
              })}
              {errors.address && (
                <span className="text-[red] py-1">
                  Missing Location is required
                </span>
              )}
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label>
              Missing Date{" "}
              <span className="text-xl text-[#F29500] py-4">*</span>
            </label>
            <input
              {...register("missingDate", { required: true })}
              className="py-2 px-4 border rounded"
              type="date"
              placeholder="Enter missing date"
            />
            {errors.missingDate && (
              <span className="text-[red] py-1">Date is required</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label>
              Training Status{" "}
              <span className="text-xl text-[#F29500] py-4">*</span>
            </label>
            <select
              {...register("training", { required: true })}
              className="py-2 px-4 border rounded"
            >
              <option value="1">Trained</option>
              <option value="0">Not Trained</option>
            </select>
            {errors.training && (
              <span className="text-[red] py-1">Training is required</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label>
              Short Description{" "}
              <span className="text-xl text-[#F29500] py-4">*</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="py-2 px-4 border rounded"
              placeholder="Write about your pets.."
              cols="30"
              rows="3"
            ></textarea>
            {errors.description && (
              <span className="text-[red] py-1">Description is required</span>
            )}
          </div>

          <div>
            <button
              disabled={postLoading}
              className="px-6 py-4 bg-[#272633] text-white hover:bg-[#FC7676] duration-300 cursor-pointer rounded"
              type="submit"
            >
              ADD POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MissingPost;
