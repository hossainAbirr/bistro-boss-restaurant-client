import { useForm } from "react-hook-form";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import { ImSpoonKnife } from "react-icons/im";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imagHostingKey = import.meta.env.VITE_image_api_key;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imagHostingKey}`;
const AddItems = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const imageFileCl = { image: data.image[0]}
        console.log(imageFileCl, 'line 17');
        const res = await axiosPublic.post(imgHostingApi, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data);
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url,
            }
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    return (
        < div >
            <SectionTitle subHeading={`What's New`} heading={`Add Items`}></SectionTitle>
            <div className="my-16 p-16 bg-[#F3F3F3]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text text-xl font-semibold">Recipe Name* </span>
                        </label>
                        <input type="text" {...register('name')} placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full gap-6 flex-row">
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Category* </span>
                            </label>
                            <select {...register('category')} className="select select-bordered  w-full">
                                <option disabled selected>Select A Category</option>
                                <option value="salad">Salads</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soups</option>
                                <option value="dessert">Desserts</option>
                                <option value="drink">Drinks</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Price* </span>
                            </label>
                            <input type="text" {...register('price')} placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label ">
                            <span className="label-text text-xl font-semibold">Food Recipe*</span>
                        </label>
                        <textarea {...register('details')} className="textarea textarea-bordered h-24" placeholder="Food Reciepe"></textarea>
                    </div>
                    <div className="mb-5">
                        <input type="file" {...register('image')} className="file-input w-full max-w-md" />
                    </div>

                    <div>

                        <span className="relative text-xl font-bold ">
                            <input className="btn relative pr-14 text-white bg-gradient-to-r from-[#835D23] to-[#B58130]" type="submit" value={`Add Item `} />
                            <ImSpoonKnife className="absolute top-1 right-4 text-white"></ImSpoonKnife>
                        </span>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default AddItems;