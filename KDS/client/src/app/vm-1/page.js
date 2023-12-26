'use client';

import axios from "axios";
import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";


function Vm1Page() {
    const [results, setResults] = useState([]);
    const [results1, setResults1] = useState([]);
    const [results2, setResults2] = useState([]);

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL + "/vm1")
            .then((res) => {
                setResults(res.data.result)
            })

        axios.get(process.env.NEXT_PUBLIC_API_URL + "/vm1/patch")
            .then((res) => {
                setResults1(res.data.result)
            })

        axios.get(process.env.NEXT_PUBLIC_API_URL + "/vm1/recommendation")
            .then((res) => {
                setResults2(res.data.result)
            })

    }, []);




    return(
        <div className="p-4">
            <div className="my-4 text-gray-300 font-2xl border-b border-gray-300 pb-2">
                VM-1
            </div>

            <div className="bg-gray-800 p-4 rounded">
                <div>
                    <Table>
                        <TableHeader>
                            <TableColumn>Policy ID</TableColumn>
                            <TableColumn>Policy Ad</TableColumn>
                            <TableColumn>Yama</TableColumn>
                            <TableColumn>Yama Seviyesi</TableColumn>
                            <TableColumn>Öneri</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                results.map((result, index) => {

                                    return(
                                        <TableRow key={index}>
                                            <TableCell>{result?.policy_id}</TableCell>
                                            <TableCell>{result?.policy_ad}</TableCell>
                                            <TableCell>{result?.yama}</TableCell>
                                            <TableCell>{results1[index]?.yama_seviyesi}</TableCell>
                                            <TableCell>{results2[index]?.oneri_metni}</TableCell>
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

export default Vm1Page;