'use client';

import LeftMenu from "@/components/LeftMenu/LeftMenu";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";


function DashboardLayout({children}) {
    const [cookieExist, setCookieExist] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        const cookie = document.cookie.indexOf('user_jwt') > -1;

        setCookieExist(cookie)

        if(!cookie && pathname !== '/login') {
            window.location.href = '/login'
        }

    }, []);


    return(
        <div className="flex h-full min-h-screen relative">

            {
                cookieExist && <>
                    <LeftMenu />
                    <div className="w-[calc(100vw-270px)]">
                        {children}
                    </div>
                </>
            }
        </div>
    )
}

export default DashboardLayout