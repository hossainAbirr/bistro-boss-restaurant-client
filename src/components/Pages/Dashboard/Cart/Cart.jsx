
import Swal from 'sweetalert2';
import useCart from '../../../../hooks/useCart';
import SectionTitle from '../../../SharedComponents/SectionTitle';
import { RiDeleteBin5Line } from "react-icons/ri";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
const Cart = () => {
    const [carts, refetch] = useCart();
    const totalPrice = carts.reduce((total, item) => total + item.price, 0)
    const totalPriceInt = parseInt(totalPrice);
    const axiosSecure = useAxiosSecure();
    const handleDelete = id => {
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
                axiosSecure.delete(`/carts/${id}`)
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
    return (
        <div className='font-fontInter'>
            <SectionTitle
                subHeading={'---Hurry Up---!'}
                heading={'MANAGE ALL ITEMS'}
            ></SectionTitle>
            <div className="flex justify-around pt-16">
                <h2 className='text-3xl font-bold font-fontCinzel'>Total Orders : {carts.length}</h2>
                <h2 className='text-3xl font-bold font-fontCinzel'>Total Price : {totalPriceInt}</h2>
                {
                    carts.length ? <Link to='/dashboard/payment'>
                        <button className='text-3xl font-bold font-fontCinzel btn text-white bg-[#D1A054]'>Pay</button>
                    </Link> : <button disabled className='text-3xl font-bold font-fontCinzel btn text-white bg-[#D1A054]'>Pay</button>
                }
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#D1A054] text-white font-fontCinzel rounded-2xl'>
                            <th>
                                <label>
                                    {/* <input type="checkbox" className="checkbox" /> */}
                                </label>
                            </th>
                            <th>Food Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            carts.map((item, idx) => <tr key={item._id}>
                                <th>
                                    <label>
                                        {idx}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p>{item.name}</p>
                                </td>
                                <td>
                                    <p>${item.price}</p>
                                </td>
                                <th>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ms text-lg bg-[#B91C1C] text-white"><RiDeleteBin5Line></RiDeleteBin5Line> </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Cart;