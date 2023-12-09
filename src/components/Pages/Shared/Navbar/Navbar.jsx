import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { FaCartPlus } from 'react-icons/fa';
import useCart from "../../../../hooks/useCart";
import useAdmin from "../../../../hooks/useAdmin";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin();
    const [cart] = useCart();
    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => {
                console.log(error);
            })
    }
    const navLinks = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={`/menu`}>Our Menu</NavLink></li>
        <li><NavLink to={`/order/salads`}>Order Food</NavLink></li>
        <li><NavLink to={`/register`}>Register</NavLink></li>
        {
            user && isAdmin && <li><NavLink to={`/dashboard/adminHome`}>Dashboard</NavLink></li>
        }
        {
            user && !isAdmin && <li><NavLink to={`/dashboard/userHome`}>Dashboard</NavLink></li>
        }
        {
            user ? <><button onClick={handleLogOut} className="btn">Log Out</button></> :
                <li><NavLink to={`/login`}>Log In</NavLink></li>
        }
    </>

    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 text-white bg-black max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Bistro BOSS <br />
                        Restaurant</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <li className="list-none">
                        <NavLink className='btn btn-ghost' to={`/dashboard/cart`}>
                            <FaCartPlus className="text-2xl"></FaCartPlus>
                            <span className="badge badge-success">{cart.length}</span>
                        </NavLink>
                    </li>
                </div>
            </div>
        </>
    );
};

export default Navbar;