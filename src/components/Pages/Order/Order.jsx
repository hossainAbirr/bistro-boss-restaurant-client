import PageCover from "../Shared/Cover/PageCover";
import banner2 from '../../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../../hooks/useMenu";
import { useState } from "react";

import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";

const Order = () => {

    const categories = ['salads', 'pizzas', 'soups', 'desserts', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category)

    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();
    // const offered = menues.filter(item => item.category === 'offered')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup = menu.filter(item => item.category === 'soup')
    const dessert = menu.filter(item => item.category === 'dessert')
    const salad = menu.filter(item => item.category === 'salad')
    const drinks = menu.filter(item => item.category === 'drinks')
    return (
        <div>
            <PageCover img={banner2} title={'Order Food'}></PageCover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab >Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soups</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Drinks</Tab>
                </TabList>

                <TabPanel>
                    <OrderTab item={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={drinks}></OrderTab>
                </TabPanel>

            </Tabs>
        </div>
    );
};

export default Order;