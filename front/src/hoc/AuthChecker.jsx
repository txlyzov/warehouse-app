import React from "react";
import { Navigate, useLocation } from "react-router-dom"
import { PATH_VARIBLES } from "../utils/Constants";
import { getLoginData } from "../utils/LocalStorageUtil";

function AuthChecker({ children, isNeedAuth }) {
    const location = useLocation();
    const auth = !!getLoginData('loginData');

    if (!auth && isNeedAuth === true) {
        return <Navigate to={PATH_VARIBLES.SIGN_IN} state={{ from: location }} />
    }

    if (auth && isNeedAuth === false) {
        return <Navigate to={PATH_VARIBLES.MAIN} state={{ from: location }} />
    }

    return children;
}

export default AuthChecker;
