// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     fetch('http://localhost:3900/menu', {
    //         method: 'GET'
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data);
    //             setLoading(false)
    //         })
    // }, [])

    const {data : menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async() => {
            const res = axiosPublic.get('/menu');
            return (await res).data
        }
    })


    return [menu, loading , refetch]
};

export default useMenu;