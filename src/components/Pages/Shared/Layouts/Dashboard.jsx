import { FaBook, FaShopify, FaUsers } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { ImSpoonKnife } from "react-icons/im";
import { NavLink, Outlet } from "react-router-dom";
import { BsCalendar3 } from "react-icons/bs";
import useAdmin from "../../../../hooks/useAdmin";
import { GiWallet } from "react-icons/gi";
import lloading from '../../../../assets/others/loading.json'
import Lottie from "lottie-react";
const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    console.log('from dashboard', isAdmin);
    if(isAdminLoading){
        return <div className="flex h-screen justify-center items-center">
        <Lottie animationData={lloading} loop={true}></Lottie>
    </div>
    }
    return (
        <div className="font-fontInter flex">
            <div className="w-64 min-h-screen bg-[#D1A054] pt-12 pl-8">
                <h2 className="font-fontInter font-black text-2xl">BISTRO BOSS</h2>
                <h2 className="font-fontCinzel font-bold text-lg tracking-[5.80px]">Restaurant</h2>
                <ul className="menu space-y-6 mt-16">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/adminHome`}>
                                    <MdHome className="w-6 h-6"></MdHome>
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/add`}>
                                    <ImSpoonKnife className="w-6 h-6"></ImSpoonKnife>
                                    Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/manage`}>
                                    <TfiMenuAlt className="w-6 h-6"></TfiMenuAlt>
                                    Manage Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/bokings`}>
                                    <FaBook className="w-6 h-6"></FaBook>
                                    Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/users`}>
                                    <FaUsers className="w-6 h-6"></FaUsers>
                                    All Users
                                </NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/userHome`}>
                                        <MdHome className="w-6 h-6"></MdHome>
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/payment`}>
                                        <BsCalendar3 className="w-6 h-6"></BsCalendar3>
                                        Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/paymentHistory`}>
                                        <GiWallet className="w-6 h-6"></GiWallet>
                                        Payment History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/cart`}>
                                        <MdHome className="w-6 h-6"></MdHome>
                                        My Cart
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/review`}>
                                        <MdHome className="w-6 h-6"></MdHome>
                                        Add Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/booking`}>
                                        <MdHome className="w-6 h-6"></MdHome>
                                        My Booking
                                    </NavLink>
                                </li>
                            </>
                    }

                    <div className="divider"></div>

                    <li>
                        <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/`}>
                            <FaShopify className="w-6 h-6"></FaShopify>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/menu`}>
                            <FaShopify className="w-6 h-6"></FaShopify>
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/shop`}>
                            <FaShopify className="w-6 h-6"></FaShopify>
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="flex gap-3 items-center font-medium font-fontCinzel" to={`/dashboard/contact`}>
                            <FaShopify className="w-6 h-6"></FaShopify>
                            Contact
                        </NavLink>
                    </li>


                </ul>
            </div>
            {/* dashboard content  */}
            <div className="flex-1 pt-12 px-12">
                <Outlet></Outlet>

            </div>
        </div>
    );
};

export default Dashboard;