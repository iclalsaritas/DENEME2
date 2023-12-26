'use client';

import Link from "next/link";
import {FiHome} from "react-icons/fi";
import {FaRegMap} from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { HiOutlineServerStack } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";


import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import classNames from "classnames";

function LeftMenu() {
    const [activeIndex, setActiveIndex] = useState(0);

    const pathname = usePathname();

    useEffect(() => {
        if(pathname === '/') {
            setActiveIndex(0)
        }else if(pathname === '/tehditler') {
            setActiveIndex(1)
        }
        else if(pathname === '/harita') {
            setActiveIndex(2)
        }
        else if(pathname === '/politikalar') {
            setActiveIndex(3)
        }
        else if(pathname === '/yamalar') {
            setActiveIndex(4)
        } else if(pathname === '/vm-1') {
            setActiveIndex(5)
        } else if(pathname === '/vm-2') {
            setActiveIndex(6)
        }


    }, [pathname]);



    return(
        <>
            <div className="w-[270px] bg-[#212529]">
                <div className="text-[#6c757d] font-bold mb-2 text-sm pt-4 px-4">
                    YÖNETİCİ PROFİLİ
                </div>

                <div className="flex items-center justify-center pt-4">
                    <div className=" my-4 border border-gray-600 rounded-full w-[100px] h-[100px] p-[2px]">
                        <img src="images/person.png" className="rounded-full w-[96px] h-[96px]" alt="avatar" />
                    </div>
                </div>
                <div className="text-[#ffffff8c] text-center">
                    Admin Panele Hoş Geldiniz
                </div>


                <div className="flex flex-col gap-3 pt-12">
                    <Link href="/" className={classNames({
                        "text-[#ffffff8c] flex items-center gap-2 px-4": true,
                        "text-[#ffffffee]": activeIndex === 0
                    })}>
                        <div>
                            <FiHome />
                        </div>
                        <div>Ana Sayfa</div>
                    </Link>

                    <div className="border-b border-[#f8f9fa] opacity-25 my-4" />


                    <div className="text-[#6c757d] text-sm font-bold px-4">
                        RAPORLAR
                    </div>
                    <Link href="/tehditler" className={classNames({
                        "text-[#ffffff8c] flex items-center gap-2 px-4": true,
                        "text-[#ffffffee]": activeIndex === 1
                    })}>
                        <div>
                            <MdOutlineErrorOutline />
                        </div>
                        <div>Tehditler</div>
                    </Link>
                    <Link href="/harita" className={classNames({
                        "text-[#ffffff8c] flex items-center gap-2 px-4": true,
                        "text-[#ffffffee]": activeIndex === 2
                    })}>
                        <div>
                            <FaRegMap />
                        </div>
                        <div>Tehdit Haritası</div>
                    </Link>
                    <Link href="/politikalar" className={classNames({
                        "text-[#ffffff8c] flex items-center gap-2 px-4": true,
                        "text-[#ffffffee]": activeIndex === 3
                    })}>
                        <div>
                            <MdOutlinePolicy />
                        </div>
                        <div>Politikalar</div>
                    </Link>
                    <Link href="/yamalar" className={classNames({
                        "text-[#ffffff8c] flex items-center gap-2 px-4": true,
                        "text-[#ffffffee]": activeIndex === 4
                    })}>
                        <div>
                            <FaRegCircleCheck />
                        </div>
                        <div>Yamalar</div>
                    </Link>

                    <div className="border-b border-[#f8f9fa] opacity-25 my-4" />

                    <div className="text-[#6c757d] text-sm font-bold px-4">
                        MAKİNELER
                    </div>

                    <Link href="/vm-1" className={classNames({
                        "text-[#ffffff8c] flex items-center gap-2 px-4": true,
                        "text-[#ffffffee]": activeIndex === 5
                    })}>
                        <div>
                            <HiOutlineServerStack />
                        </div>
                        <div>VM-1</div>
                    </Link>
                    <Link href="/vm-2" className={classNames({
                        "text-[#ffffff8c] flex items-center gap-2 px-4": true,
                        "text-[#ffffffee]": activeIndex === 6
                    })}>
                        <div>
                            <HiOutlineServerStack />
                        </div>
                        <div>VM-2</div>
                    </Link>

                    <div className="border-b border-[#f8f9fa] opacity-25 my-4" />

                    <Link href="/cikis-yap" className="text-[#ffffff8c] flex items-center gap-2 px-4">
                        <div>
                            <MdLogout />
                        </div>
                        <div>Çıkış Yap</div>
                    </Link>

                    <div className="flex items-center justify-center">
                        <img src="/images/tt.png" alt="tt" className="w-1/3 pt-4" />
                    </div>

                </div>

            </div>



        </>
    )
}

export default LeftMenu