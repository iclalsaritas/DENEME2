'use client';

import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import axios from "axios";
import {useEffect, useState} from "react";


function PolitikalarPage() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL + "/policies")
            .then((res) => {
                setResults(res.data.result)
            })
    }, []);


    return(
        <div className="p-4">
            <div className="my-4 text-gray-300 font-2xl border-b border-gray-300 pb-2">
                POLİTİKALAR
            </div>
            <div className="p-4">

                <div className="bg-gray-800 p-4 rounded">
                    <Table>
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>Politika Adı</TableColumn>
                            <TableColumn>Yama</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                results.map((result, index) => {


                                    return(
                                        <TableRow key={index}>
                                            <TableCell>{result.policy_id}</TableCell>
                                            <TableCell>{result.policy_name}</TableCell>
                                            <TableCell>{result.yama_ad}</TableCell>
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

export default PolitikalarPage;