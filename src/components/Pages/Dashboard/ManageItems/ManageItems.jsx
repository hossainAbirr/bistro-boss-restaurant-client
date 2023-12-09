import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useMenu from "../../../../hooks/useMenu";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const axiosSecure = useAxiosSecure();

    const [menu, loading, refetch] = useMenu();
    const handleDelete = (menu) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${menu._id}`)
                console.log(res.data);

                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Item has been deleted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // .then(res => {
                //     console.log(res.data);
                //     if (res.data.deletedCount > 0) {
                //         Swal.fire({
                //             title: "Deleted!",
                //             text: "Your file has been deleted.",
                //             icon: "success",
                //         });
                //         // refetch();
                //     }
                // })
            }
        });
    }
    return (
        <div className='font-fontInter'>
            <SectionTitle
                subHeading={'---Hurry Up---!'}
                heading={'MANAGE ALL Itmes'}
            ></SectionTitle>
            <div className="flex justify-around pt-16">
                <h2 className='text-3xl font-bold font-fontCinzel'>Total Users : {menu.length}</h2>
                <h2 className='text-3xl font-bold font-fontCinzel'>Total Price : { }</h2>
                <h2 className='text-3xl font-bold font-fontCinzel btn text-white bg-[#D1A054]'>Pay</h2>
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#D1A054] text-white font-fontCinzel rounded-2xl'>
                            <th>
                                <label>
                                    {/* <input type="checkbox" className="checkbox" /> */}
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            menu.map((item, index) => <tr key={item._id}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p>{item.name}</p>
                                </td>
                                <td>
                                    <p>{item.price}</p>
                                </td>
                                <td>
                                    {item?.role === 'admin' ? 'Admin' : <Link to={`/dashboard/update/${item._id}`}><button
                                        className="btn bg-[#D1A054] text-white text-2xl">
                                        <FaRegEdit></FaRegEdit>
                                    </button></Link>}
                                </td>
                                <th>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ms text-lg bg-[#B91C1C] text-white"><RiDeleteBin5Line></RiDeleteBin5Line> </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;