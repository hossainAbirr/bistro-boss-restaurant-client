import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3900'
})
const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use((config) => {
        console.log('stopped by interceptors');
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearers ${token}`;
        return config
    }, function (error) {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        console.log(error);
        const status = error.response.status;
        console.log('error status in the interceptors', status);
        if (status === 401 || status === 403) {
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    })
    return axiosSecure

};

export default useAxiosSecure;