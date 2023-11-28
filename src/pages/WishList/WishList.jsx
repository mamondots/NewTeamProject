import axios from "axios";
import { useEffect, useState } from "react";
import useWishList from "../../hooks/useWishList";
import Swal from "sweetalert2";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";


const WishList = () => {
    // const [wishInfo, setWishInfo] = useState([])

    // useEffect(() => {
    //     axios.get('https://litl-pal-server-margubtech-gmailcom.vercel.app/api/user-wishlist')
    //         .then(data => {
    //             setWishInfo(data.data)
    //         })
    // }, [])


    const [information, refetch] = useWishList()

    const handleDelete = info => {
        axios.delete(`https://litl-pal-server-margubtech-gmailcom.vercel.app/api/user-wishlist/${info._id}`)
            .then(data => {
                if (data.data.deletedCount > 0) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
                refetch()
            })
    }

    return (
        <div className="my-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <h2 className="text-xl font-bold text-[#4B5563]">You Select This Sweet <span className="text-[#FC7676]">Pets</span> For Checkout Later</h2>

            <div className="my-10">
                <table className="w-full text-center">
                    <thead className="w-full text-center">
                        <tr className="bg-[#FC7676] text-[#fff]">
                            <th className="py-2">#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Published Date</th>
                            <th>Gender</th>
                            <th>Color</th>
                            <th>Action</th>

                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {
                            information.map((info, index) => <tr key={info._id} className="bg-[#f0f0f0] border text-center">
                                <td className="py-2">{index + 1}</td>
                                <td className="py-2">
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img className="rounded-full" src={info.img} alt="" />
                                    </div>
                                </td>
                                <td>{info.title}</td>
                                <td>{info.missingDate}</td>
                                <td>{info.color}</td>
                                <td>{info.gender}</td>
                                <td className="text-center flex items-center justify-center">
                                    <div className="flex items-center  cursor-pointer space-x-4">
                                        <p onClick={() => handleDelete(info)} 
                                        className="px-2 py-2 bg-[#E66777] text-white text-xl hover:rounded-md duration-300 hover:bg-[#f34960]"><AiFillDelete></AiFillDelete></p>
                                        <p className="px-2 py-2 bg-[#FC7676] text-white text-xl hover:rounded-md duration-300 hover:bg-[#c65252]"><FaEdit></FaEdit></p>
                                    </div>

                                </td>
                            </tr>)

                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WishList;