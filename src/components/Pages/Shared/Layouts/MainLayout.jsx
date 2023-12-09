import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const MainLayout = () => {
    const location = useLocation()
    const noHeaderFooter = location.pathname.includes(`login`);
    const noHeaderFooter1 = location.pathname.includes(`register`);

    return (
        <div>
            {noHeaderFooter || noHeaderFooter1 || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noHeaderFooter || noHeaderFooter1 || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;