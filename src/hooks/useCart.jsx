import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const { user } = useAuth();
    console.log(user);
    const axiosSecure = useAxiosSecure();
    const { refetch, data: carts = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: user === true,
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            return res.data;
        }
    })
    return [carts, refetch]
};

export default useCart;