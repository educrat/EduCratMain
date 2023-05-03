import { useContext } from 'react';
import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
    useLocation,
} from 'react-router-dom';
import AppUserContext from '../context/AppUserContext';

const ProtectedRoute = ({ children }) => {
    const { appuser } = useContext(AppUserContext);
    const location = useLocation();

    

    if (!appuser) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;