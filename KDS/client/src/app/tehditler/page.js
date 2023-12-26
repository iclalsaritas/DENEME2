'use client';
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import threats from "@/config/threats";
import {useEffect, useState} from "react";
import axios from "axios";

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});
import dynamic from "next/dynamic";

function Threats() {
    const [selectedThreat, setSelectedThreat] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [results, setResults] = useState([]);
    const [threatsTotalNumberByDay, setThreatsTotalNumberByDay] = useState([]);
    const [patchesTotalNumberByDay, setPatchesTotalNumberByDay] = useState([]);
    const [chart1_series, setChart1_series] = useState([]);
    const [chart2_series, setChart2_series] = useState([]);
    const [chart1_options, setChart1_options] = useState({
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false,
                format: "dd/MM/yy"
            }
        }
    });
    const [chart2_options, setChart2_options] = useState({
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false,
                format: "dd/MM/yy"
            }
        }
    });

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL + "/threats")
            .then((res) => {
                setResults(res.data.result)
            })
            .catch((err) => {
                console.log(err)
            })

    }, []);


    useEffect(() => {
        const data = [];
        const data2 = [];

        results.map((result) => {
            let originalDate = new Date(result.bitis_tarihi);

            // set gmt +3

            let date = originalDate.getDate();
            let month = originalDate.getMonth();
            const year = originalDate.getFullYear();


            month = month+1;

            if(!data[year+'_'+month+'_'+date]) {
                data[year+'_'+month+'_'+date] = 0;
            }

            if(!data2[year+'_'+month+'_'+date]) {
                data2[year+'_'+month+'_'+date] = 0;
            }

            const rand = parseInt((Math.random() * (5 - 1) + 1).toFixed(0))

            data[year+'_'+month+'_'+date] += result.tehdit_sayisi;
            data2[year+'_'+month+'_'+date] = rand;


        })

        setThreatsTotalNumberByDay(data);
        setPatchesTotalNumberByDay(data2)


    }, [results]);


    useEffect(() => {
        const uniqDateNames = {};

        const dateNames = results.map((result) => {

            let date = new Date(result.bitis_tarihi);

            let day = date.getDate();
            let month = date.getMonth();
            const year = date.getFullYear();

            if(!uniqDateNames[year+'_'+month+'_'+day]) {
                uniqDateNames[year+'_'+month+'_'+day] = result.bitis_tarihi;
            }

            return result.bitis_tarihi;
        })

        let chart1_options_init = {
            id: 'spark4',
            group: 'sparks',
            chart: {
                group: 'sparks',
                stroke: {
                    curve: 'straight'
                },
                grid: {
                    padding: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20
                    },
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                }
            },
            dataLabels: {
                enabled: false
            },
            labels: Object.values(uniqDateNames).reverse(),
            xaxis: {
                type: "datetime",
                labels: {
                    datetimeUTC: false,
                    format: "dd/MM/yy"
                }
            }
        }
        let chart2_options_init = {
            id: 'spark5',
            group: 'sparks',
            chart: {
                group: 'sparks',
                stroke: {
                    curve: 'straight'
                },
                grid: {
                    padding: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20
                    },
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                }
            },
            dataLabels: {
                enabled: false
            },
            labels: Object.values(uniqDateNames).reverse(),
            xaxis: {
                type: "datetime",
                labels: {
                    datetimeUTC: false,
                    format: "dd/MM/yy"
                }
            }
        }

        const chart1_series_init = [
            {
                name: "Tehdit Sayısı",
                data: Object.values(threatsTotalNumberByDay).reverse()
            }
        ]
        const chart2_series_init = [
            {
                name: "Yama Sayısı:",
                data: Object.values(patchesTotalNumberByDay).reverse()
            }
        ]


        setChart1_options(chart1_options_init)
        setChart2_options(chart2_options_init)
        setChart1_series(chart1_series_init)
        setChart2_series(chart2_series_init)
    }, [results, threatsTotalNumberByDay, patchesTotalNumberByDay]);


    return(
        <div className="p-4">
            <div className="my-4 text-gray-300 font-2xl border-b border-gray-300 pb-2">
                TEHDİTLER
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex justify-end gap-3">
                    <div className="w-[250px]">
                        <Select
                            label="Tehdit"
                            className="w-[250px]"
                            // size="xs"
                            value={selectedThreat}
                            onChange={(e) => setSelectedThreat(e.target.value)}
                        >
                            {
                                threats.map((threat) => (
                                    <SelectItem key={threat} value={threat}>
                                        {threat}
                                    </SelectItem>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="w-[150px]">
                        <Input  name="baslangic" type="date" onChange={(e) => {
                            setStartDate(e.target.value)
                        }} />
                    </div>
                    <div className="w-[150px]">
                        <Input  name="bitis" type="date" onChange={(e) => {
                            setEndDate(e.target.value)
                        }} />
                    </div>
                    <div>
                        <Button
                            auto
                            color="primary"
                            size="small"
                            className="w-full text-white h-full"
                            onClick={() => {
                                axios.get(process.env.NEXT_PUBLIC_API_URL + "/threats?threatType="+selectedThreat+"&startDate="+startDate+"&endDate="+endDate)
                                    .then((res) => {
                                        setResults(res.data.result)
                                    })
                            }}
                        >
                            Uygula
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-2 w-full gap-x-4">
                    <div className="bg-gray-800 rounded p-4">
                        <div className="text-white">Tehdit Sayısı</div>
                        <Chart
                            options={chart1_options}
                            series={chart1_series}
                            type="line"
                            width="100%"
                            height="400"
                        />
                    </div>

                    <div className="bg-gray-800 rounded p-4">
                        <div className="text-white">Yama Sayısı</div>
                        <Chart
                            options={chart2_options}
                            series={chart2_series}
                            type="area"
                            width="100%"
                            height="400"
                        />
                    </div>

                </div>

            </div>

        </div>
    )

}

export default Threats;