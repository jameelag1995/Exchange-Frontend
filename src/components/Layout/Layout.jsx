import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants';
import SideBar from '../SideBar/SideBar';
import BottomNavbar from '../BottomNavbar/BottomNavbar';

export const Layout = ({ children }) => {
    const location = useLocation();
    
    const shouldShowNavigation = () => {
        const authRoutes = [
            ROUTES.AUTH.MAIN,
            ROUTES.AUTH.LOGIN,
            ROUTES.AUTH.REGISTER,
        ];
        
        return !authRoutes.some(route => 
            location.pathname.includes(route) || location.pathname === ROUTES.HOME
        );
    };

    if (!shouldShowNavigation()) {
        return <>{children}</>;
    }

    return (
        <>
            <SideBar />
            <BottomNavbar />
            {children}
        </>
    );
}; 