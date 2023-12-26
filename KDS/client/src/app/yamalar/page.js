'use client';

import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import axios from "axios";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";


function Patches() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL + "/threats")
            .then((res) => {
                setResults(res.data.result)
            })
    }, []);



    return(
        <div className="p-4">
            <div className="my-4 text-gray-300 font-2xl border-b border-gray-300 pb-2">
                YAMALAR
            </div>
            <div className="p-4">

                <div className="bg-gray-800 p-4 rounded">
                    <Table>
                        <TableHeader>
                            <TableColumn>Yama Adı</TableColumn>
                            <TableColumn>Tehdit Tipi</TableColumn>
                            <TableColumn>Tehdit Sayısı</TableColumn>
                            <TableColumn>Yama Adı</TableColumn>
                            <TableColumn>Bitiş Tarihi</TableColumn>
                            <TableColumn>Yama Tarihi</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                results.reverse().map((result, index) => {

                                    let date = new Date(result.yama_tarihi).toLocaleDateString("tr-TR")
                                    let date2 = new Date(result.bitis_tarihi)

                                    if(Math.random() < 0.3) {
                                        // 1 ile 3 arasinda sayi
                                        const rand = Math.floor(Math.random() * 3) + 1;

                                        date2.setDate(date2.getDate() - rand)
                                    }

                                    date2 = date2.toLocaleDateString("tr-TR")

                                    return(
                                        <TableRow key={index}>
                                            <TableCell>{result.yama_id}</TableCell>
                                            <TableCell>{result.tehdit_ad}</TableCell>
                                            <TableCell>{result.tehdit_sayisi}</TableCell>

                                            <TableCell>
                                                <div className="bg-green-800 p-1 rounded text-white">
                                                    {result.yama_adi}
                                                </div></TableCell>
                                            <TableCell>{date2}</TableCell>
                                            <TableCell>{date}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>

                    </Table>

                </div>

            </div>

        </div>
    )
}

export default Patches;