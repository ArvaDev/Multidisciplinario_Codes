import { Navigate } from 'react-router-dom';
export const VerifyToken = ({ element, path = '/' }) => {
    const token = localStorage.getItem('token');
    return !token ? <Navigate to={path}/> : element;
}
