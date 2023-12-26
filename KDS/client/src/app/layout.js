'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import DashboardLayout from "@/layouts/DashboardLayout";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
    const [cookieExist, setCookieExist] = useState(false);
    const pathname = usePathname();



    useEffect(() => {
        const cookie = document.cookie.indexOf('user_jwt') > -1;

        setCookieExist(cookie)

        if(!cookie && pathname !== '/login') {
            window.location.href = '/login'
        }

    }, []);


    return (
        <html lang="en">
        <body className={inter.className}>
        {
            pathname !== '/login' ? <DashboardLayout>
                    {children}
                </DashboardLayout>
                :
                <>
                    {children}
                </>
        }


        </body>
        </html>
    )
}
