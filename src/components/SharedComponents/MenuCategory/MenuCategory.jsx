
import { Link } from "react-router-dom";
import MenuCover from "../../Pages/Shared/Cover/MenuCover";
import MenuItem from "../MenuItem/MenuItem";

const MenuCategory = ({ items, bgImage, title, description }) => {
    const text = title ? title : '';
    const lowerCaseTitle = text.toLowerCase();
    console.log('My lowercase',lowerCaseTitle);
    return (
        <div>
            {title &&

                <MenuCover
                    img={bgImage}
                    title={title}
                ></MenuCover>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-12">

                {
                    items.map(menu => <MenuItem
                        key={menu._id}
                        menu={menu}
                    ></MenuItem>)
                }
            </div>
            
            <div className="flex justify-center">
                <Link to={`/order/${lowerCaseTitle}`}>
                    <button className="btn hover:bg-[#1F2937] hover:text-[#BB8506] border-0 border-b-[3px] border-black bg-transparent">ORDER YOUR FAVOURITE FOOD</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;