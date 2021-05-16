import React, {useState} from "react";
import {getCookie, setCookie} from "react-use-cookie";

const tokenCookie = 'token';

function useAuthentication() {
    const [authToken, setAuthToken] = useState(getCookie(tokenCookie));
    const authTokenReceived = (value) => {
        setCookie(tokenCookie, value);
        setAuthToken(value);
    };
    const resetAuth = () => {
        authTokenReceived('');
        window.location.href = '/login';
    };

    return {
        isAuth: !!authToken.length,
        authToken: authToken,
        setAuthToken: authTokenReceived,
        authHeaders: {token: authToken},
        resetAuth: resetAuth,
    };
}

export default useAuthentication;