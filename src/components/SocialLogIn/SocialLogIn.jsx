import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const SocialLogIn = () => {
    const {googleLogIn} = useAuth();

    const axiosPublic = useAxiosPublic();

    const handleGoogle = () => {
        googleLogIn()
        .then(result => {
            console.log(result);
            const userInfo = {
                name: result.user?.displayName,
                email : result.user?.email,
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
            })
        })
        .catch(error => {
            console.error(error);
        })
    }
    return (
        <div className="flex justify-center  pb-5 gap-5">
            <button onClick={handleGoogle} className="btn btn-circle btn-outline">
                <FaGoogle className="text-2xl"></FaGoogle>

            </button>
            <button className="btn btn-circle btn-outline">
                <FaGoogle className="text-2xl"></FaGoogle>
            </button>
            <button className="btn btn-circle btn-outline">
                <FaGoogle className="text-2xl"></FaGoogle>

            </button>
        </div>
    );
};

export default SocialLogIn;