import { Helmet, } from 'react-helmet-async';
import PageCover from '../Shared/Cover/PageCover';
import banner3 from '../../../assets/menu/banner3.jpg'
import useMenu from '../../../hooks/useMenu';
import MenuCategory from '../../SharedComponents/MenuCategory/MenuCategory';
import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../SharedComponents/SectionTitle';

const Menu = () => {
    const [menues] = useMenu();
    const offered = menues.filter(item => item.category === 'offered')
    const pizza = menues.filter(item => item.category === 'pizza')
    const soup = menues.filter(item => item.category === 'soup')
    const dessert = menues.filter(item => item.category === 'dessert')
    const salad = menues.filter(item => item.category === 'salad')

    return (
        <div className='space-y-20'>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <PageCover
                img={banner3}
                title={'OUR MENU'}
            ></PageCover>
            <SectionTitle subHeading={"Don't Miss"} heading={"TODAY'S OFFER"}></SectionTitle>
            <MenuCategory
                items={offered}
            ></MenuCategory>

            <MenuCategory
                items={dessert}
                title={"DESSERTS"}
                bgImage={slide4}
            ></MenuCategory>
            
            <MenuCategory
                items={pizza}
                title={"Pizzas"}
                bgImage={slide2}
            ></MenuCategory>

            <MenuCategory
                items={salad}
                title={"Salads"}
                bgImage={slide1}
            ></MenuCategory>
            
            <MenuCategory
                items={soup}
                title={"Soups"}
                bgImage={slide3}
            ></MenuCategory>

        </div >
    );
};

export default Menu;