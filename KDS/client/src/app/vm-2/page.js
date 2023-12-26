'use client';

import axios from "axios";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {useEffect, useState} from "react";


function Vm2Page() {
    const [results, setResults] = useState([]);
    const [results2, setResults2] = useState([]);

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL + "/vm2")
            .then((res) => {
                setResults(res.data.result)
            })

        axios.get(process.env.NEXT_PUBLIC_API_URL + "/vm2/policies")
            .then((res) => {
                setResults2(res.data.result)
            })
    }, []);


    return(
        <div className="p-4">
            <div className="my-4 text-gray-300 font-2xl border-b border-gray-300 pb-2">
                VM-2
            </div>

            <div className="bg-gray-800 p-4 rounded flex gap-6">
                <div>
                    <Table>
                        <TableHeader>
                            <TableColumn>Policy Not</TableColumn>
                            <TableColumn>Karar Not</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                results.reverse().map((result, index) => {

                                    return(
                                        <TableRow key={index}>
                                            <TableCell>{result?.policy_not}</TableCell>
                                            <TableCell>{result?.karar_not}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>

                    </Table>
                </div>

                <div>
                    <Table>
                        <TableHeader>
                            <TableColumn>Policy ID</TableColumn>
                            <TableColumn>Policy Name</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                results2.reverse().map((result, index) => {

                                    return(
                                        <TableRow key={index}>
                                            <TableCell>{result?.policy_id}</TableCell>
                                            <TableCell>{result?.policy_name}</TableCell>
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

export default Vm2Page;