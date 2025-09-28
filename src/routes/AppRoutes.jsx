import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants";
import LoginMain from "../pages/Login/LoginMain";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import MyProducts from "../pages/MyProducts/MyProducts";
import Product from "../pages/Product/Product";
import Offer from "../pages/Offer/Offer";
import MyOffers from "../pages/MyOffers/MyOffers";
import Reviews from "../pages/Reviews/Reviews";
import Welcome from "../pages/Welcome/Welcome";
import About from "../pages/About/About";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Welcome />} />
            
            <Route path={ROUTES.AUTH.MAIN} element={<LoginMain />}>
                <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
                <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
            </Route>
            
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.MY_PRODUCTS} element={<MyProducts />} />
            <Route path={ROUTES.PRODUCT} element={<Product />} />
            <Route path={ROUTES.OFFER} element={<Offer />} />
            <Route path={ROUTES.MY_OFFERS} element={<MyOffers />} />
            <Route path={ROUTES.REVIEWS} element={<Reviews />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
        </Routes>
    );
};

export default AppRoutes; 