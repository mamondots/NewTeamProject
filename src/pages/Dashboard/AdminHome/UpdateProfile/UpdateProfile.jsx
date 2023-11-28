import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateProfile = () => {
    // const [districts, setDistricts] = useState([]);
    const {id} = useParams()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        fetch(`http://localhost:5000/api/create-user/${id}`,{
            method:"PATCH",
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.modifiedCount > 0){
                reset()
                Swal.fire({
                    title: 'success!',
                    text: 'Your Items Update successlly',
                    icon: 'success',
                    confirmButtonText: 'Finised'
                })
            }
        })
        console.log(data)
    }

    // useEffect(() => {
    //     fetch("districts.json")
    //       .then((res) => res.json())
    //       .then((data) => {
    //         const allDistricts = data.districts;
    //         allDistricts.sort();
    //         setDistricts(allDistricts);
    //         console.log(allDistricts);
    //       });
    //   }, []);
    return (
        <div className='my-6 px-12'>


            <div className="border my-6 px-12 py-4">
                <p className="text-[#FC7676] font-bold">Sydur!</p>
                <h2 className="text-xl font-bold py-2">
                    Let's update your profile
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-4">
                    <div className="w-full flex flex-col space-y-2">
                        <label htmlFor="" className="text-sm font-bold text-[#4B5563]">New Name</label>
                        <input {...register("name", { required: true })} className="px-4 py-2 border" type="text" placeholder="Enter your name" />
                    </div>
                    <div className="w-full flex flex-col space-y-2">
                        <label htmlFor="" className="text-sm font-bold text-[#4B5563]">Upload New Photo</label>
                        <input {...register("photoURL", { required: true })} className="px-4 py-2 border" type="file" placeholder="Enter your name" />
                    </div>
                    <div className="w-full flex flex-col space-y-2">
                        <label htmlFor="" className="text-sm font-bold text-[#4B5563]">Upload Phone Number</label>
                        <input {...register("phone", { required: true })} className="px-4 py-2 border" type="text" placeholder="Enter your number" />
                    </div>
                    <div className="w-full flex flex-col space-y-2">
                        <label htmlFor="" className="text-sm font-bold text-[#4B5563]">New District</label>
                        <select {...register("district", { required: true })} className="px-4 py-2 border">
                            {/* {districts.map((district) => {
                                return (
                                    <option value={district} key={district}>
                                        {district}
                                    </option>
                                );
                            })} */}

                            <option value="Brahmanbaria">Brahmanbaria</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Faridpur">Faridpur</option>
                            <option value="Madaripur">Madaripur</option>
                            <option value="Munshiganj">Munshiganj</option>
                        </select>
                    </div>
                    <div>
                        
                        <input className="px-8 py-3 bg-[#FC7676] text-white hover:bg-[#4B5563] duration-300 cursor-pointer"  type="submit" value="add" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;