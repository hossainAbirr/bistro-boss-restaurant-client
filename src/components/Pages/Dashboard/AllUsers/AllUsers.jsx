import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users',)
            return res.data
        }
    })

    const handleDelete = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Excellent!",
                                text: `${user.name} has become Admin`,
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });



    }
    return (
        <div className='font-fontInter'>
            <SectionTitle
                subHeading={'---All Users---!'}
                heading={'MANAGE ALL Users'}
            ></SectionTitle>
            <div className="flex justify-around pt-16">
                <h2 className='text-3xl font-bold font-fontCinzel'>Total Users : {users.length}</h2>
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
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((item, index) => <tr key={item._id}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <h3>{item.name}</h3>
                                    </div>
                                </td>
                                <td>
                                    <p>{item.email}</p>
                                </td>
                                <td>
                                    {item?.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(item)} className="btn bg-[#D1A054] text-white text-2xl">
                                        <FaUsers></FaUsers>
                                    </button>}
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

export default AllUsers;