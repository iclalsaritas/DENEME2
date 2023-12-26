'use client';
import {useEffect} from "react";


function Logout() {

    useEffect(() => {
        document.cookie = "user_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login"
    }, []);

    return(
        <>
        </>
    )
}

export default Logout;