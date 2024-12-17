import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
 
interface PrivateRouteProps {
    children: ReactElement;
    path: string;
}
 
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, path }) => {
    const token = useSelector((state: any) => state.tokenLoader.token);
    const userId = useSelector((state: any) => state.tokenLoader.id);
 
    return token && userId ? children : <Navigate to="/login" replace />;
};
 
export default PrivateRoute;