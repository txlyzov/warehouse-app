import React from "react";
import { Navigate, useLocation } from "react-router-dom"
import { getLoginData } from "../utils/LocalStorageUtil";

export function RecuireAuth({ children, isNeedAuth }) {
    const location = useLocation();
    const auth = !!getLoginData('loginData');

    if (!auth && isNeedAuth === true) {
        return <Navigate to='/sign-in' state={{ from: location }} />
    }
    if (auth && isNeedAuth === false) {
        return <Navigate to='/' state={{ from: location }} />
    }

    return children;
}

export default RecuireAuth;
