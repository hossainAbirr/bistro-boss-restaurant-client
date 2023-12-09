import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const FoodCard = ({ food }) => {
    const { name, image, recipe, price, _id } = food;
    const { user } = useAuth();
    const [, refetch] = useCart();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const location = useLocation();


    const handleAddToCart = () => {

        if (user && user.email) {
            // TO DO: Add to ccart api

            // axios.post('http://localhost:3900/carts', cartItem)
            //     .then(res => {
            //         console.log(res.data);
            //     })
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price,
            }
            console.log(cartItem);
            fetch('http://localhost:3900/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    if(result.insertedId){
                        refetch()
                    }
                })
        } else {
            Swal.fire({
                title: "You aren't logged in?",
                text: "Please login to add to cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Log In!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: location.pathname })
                }
            });
        }
    }
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="relative">
                <img src={image} alt="food" className="w-full" />
            </figure>
            <p className="absolute right-3 bg-[#111827] text-white px-5 py-2 rounded-xl top-4">${price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={handleAddToCart} className="btn text-[#BB8506] hover:bg-[#111827] border-0 border-b-[3px]  border-[#BB8506]">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;