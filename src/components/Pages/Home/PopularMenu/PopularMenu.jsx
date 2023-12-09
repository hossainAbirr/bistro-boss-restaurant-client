
import { useEffect, useState } from "react";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import MenuItem from "../../../SharedComponents/MenuItem/MenuItem";
import useMenu from "../../../../hooks/useMenu";

const PopularMenu = () => {

    const [menues] = useMenu();

    const popularMenu = menues.filter(item => item.category === 'popular')

    // const [menues, setMenu] = useState([]);
    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularMenu = data.filter(item => item.category === 'popular')
    //             setMenu(popularMenu);
    //         })
    // }, [])
    return (
        <div className="">
            <SectionTitle
                subHeading={'---Check it out---'}
                heading={'FROM OUR MENU'}
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-12">

                {
                    popularMenu.map(menu => <MenuItem
                        key={menu._id}
                        menu={menu}
                    ></MenuItem>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;