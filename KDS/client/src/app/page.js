'use client';
import {useEffect, useState} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import axios from "axios";
const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

export default function Home() {
    const [results, setResults] = useState([]);
    const [results2, setResults2] = useState([]);
    const [totalThreats, setTotalThreats] = useState(0);
    const [totalPolicy, setTotalPolicy] = useState(0);
    const [totalPatches, setTotalPatches] = useState(0);
    const [totalRecommendations, setTotalRecommendations] = useState(0);
    const [topThreatssss, setTopThreatssss] = useState([]);
    const [chart1_series, setChart1_series] = useState([]);
    const [chart11_options, setChart11_options] = useState({});
    const [threatsTotalNumberByDay, setThreatsTotalNumberByDay] = useState([]);


    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL + "/threats", {

        })
            .then((res) => {
                setResults(res.data.result)
            })

        axios.get(process.env.NEXT_PUBLIC_API_URL + "/threats", {
            params: {
                limit: 'all'
            }
        })
            .then((res) => {
                setResults2(res.data.result)
            })
    }, []);



    useEffect(() => {
        if(results2?.length > 0) {
            const groupedThreatsByName = results2.reduce((acc, item) => {
                if (!acc[item.tehdit_ad]) {
                    acc[item.tehdit_ad] = [];
                }

                acc[item.tehdit_ad].push(item);

                return acc;
            }, {});

            const reorderGroupedThreatsByLength = Object.keys(groupedThreatsByName).sort((a, b) => {
                return groupedThreatsByName[b].length - groupedThreatsByName[a].length;
            });

            const topThreats = reorderGroupedThreatsByLength.slice(0, 5);
            const topThreastData = topThreats.map((threat) => {
                return groupedThreatsByName[threat].length
            })

            const totalThreats = Object.keys(results2).length;

            setTotalThreats(totalThreats)
            setTotalPatches(totalThreats - 272)


            const topThreatss = topThreats.map((threat, index) => {
                return {
                    name: threat,
                    data: topThreastData[index],
                }
            })

            setTopThreatssss(topThreatss)

        }


    }, [results2])

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


    }, [results])


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

        let chart11_options_init = {
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
        const chart1_series_init = [
            {
                name: "Tehdit Sayısı",
                data: Object.values(threatsTotalNumberByDay).reverse()
            }
        ]

        setChart11_options(chart11_options_init)
        setChart1_series(chart1_series_init)




    }, [results, threatsTotalNumberByDay]);

    const rand_ip = (index) => {
        if(index === 0) {
            return '55.59.41.28'
        } else if(index === 1) {
            return '156.109.25.255'
        } else if(index === 2) {
            return '27.32.83.227'
        } else if(index === 3) {
            return '147.103.224.159'
        } else if(index === 4) {
            return '105.228.52.250'
        } else if(index === 5) {
            return '72.76.174.164'
        }
    }


    let chart1_options = {
        chart: {
            height: 80,
            sparkline: {
                enabled: true
            },
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 2,
                opacity: 0.2,
            }
        },
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 0
        },
        grid: {
            padding: {
                top: 20,
                bottom: 10,
                left: 50
            }
        },
        colors: ['#fff'],
        xaxis: {
            crosshairs: {
                width: 1
            },
        },
        tooltip: {
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function formatter(val) {
                        return '';
                    }
                }
            }
        },
        dataLabels: {
            enabled: false
        }
    }

    const threadChart_series = [
        {
            name: "series-1",
            data: [11, 127, 428, 213, 19, 69, 821, 88]
        }
    ]
    const policies_series = [
        {
            name: "series-1",
            data: [19, 29, 881, 84, 109, 442, 82, 198]
        }
    ]
    const yama_series = [
        {
            name: "series-1",
            data: [191, 229, 481, 584, 109, 242, 182, 98]
        }
    ]
    const tavsiye_series = [
        {
            name: "series-1",
            data: [1, 4, 2, 0, 0, 2, 1, 3]
        }
    ]

    const threatChartOptions = {
        labels: [topThreatssss[0]?.name, topThreatssss[1]?.name, topThreatssss[2]?.name, topThreatssss[3]?.name, topThreatssss[4]?.name],
    }

    let policyOptions = {
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: [
                'User İnternet erişimi için genel izin politikası',
                'DNS güvenlik filtreleri',
                'Malware taraması ve engelleme politikası',
                'IPS (Intrusion Prevention System) politikaları',
                'Anti-virus taraması ve temizleme politikaları',
                'Uygulama bazlı kontrol politikaları'
            ],
        }
    };



    return (
      <div className="p-4">
          <div className="my-4 text-gray-300 font-2xl border-b border-gray-300 pb-2">
              ANA SAYFA
          </div>

          <div className="grid grid-cols-4 gap-x-4">
              <Link href="/tehditler" className="bg-gradient-to-r to-red-600 from-red-800 rounded flex items-center px-4 overflow-hidden">
                  <div className="text-white">{totalThreats} Tehdit</div>
                  <Chart
                      options={chart1_options}
                      series={threadChart_series}
                      type="line"
                      width="168"
                      height="80"
                  />
              </Link>
              <Link href="/politikalar" className="bg-gradient-to-r to-emerald-600 from-emerald-800 rounded flex items-center px-4 overflow-hidden">
                  <div className="text-white">128 Policy</div>
                  <Chart
                      options={chart1_options}
                      series={policies_series}
                      type="line"
                      width="168"
                      height="80"
                  />
              </Link>
              <Link href="/yamalar" className="bg-gradient-to-r to-purple-600 from-purple-800 rounded flex items-center px-4 overflow-hidden">
                  <div className="text-white">{totalPatches} Yama</div>
                  <Chart
                      options={chart1_options}
                      series={yama_series}
                      type="line"
                      width="168"
                      height="80"
                  />
              </Link>
              <Link href="/vm-1" className="bg-gradient-to-r to-blue-600 from-blue-800 rounded flex items-center px-4 overflow-hidden">
                  <div className="text-white">20 Tavsiye</div>
                  <Chart
                      options={chart1_options}
                      series={tavsiye_series}
                      type="line"
                      width="168"
                      height="80"
                  />
              </Link>
          </div>

          <div className="py-4 inline-grid grid-cols-2 gap-4 items-start w-full">

              <div className="flex flex-col gap-3 p-4 bg-gray-800 rounded row-span-2 col-span-1 items-center">
                  <div className="text-white w-full">Tehdit Türleri</div>

                  {
                      topThreatssss.length > 0 &&           <Chart
                          options={threatChartOptions}
                          series={topThreatssss.length > 0 ? [44, 55, 13, 43, 22] : []}
                          type="pie"
                          width="400"
                          height="400"
                      />
                  }

              </div>

              <div className="flex flex-col gap-3 p-4 bg-gray-800 rounded row-span-3 col-span-1 h-full items-center">
                  <div className="text-white w-full">Tehditler</div>
                  <Chart
                      className="w-full"
                      options={chart11_options}
                      series={chart1_series}
                      type="line"
                      width="100%"
                      height="300"
                  />
                  <div className="w-full text-white">Son Tehditler</div>
                  <div className="w-full">
                      <table className="last-threats-table w-full text-white text-start">
                          <thead>
                                <tr>
                                    <th className="text-start">Tarih</th>
                                    <th className="text-start">IP</th>
                                    <th className="text-start">Tehdit</th>
                                </tr>
                          </thead>
                          <tbody>
                          {
                                results.slice(-5).reverse().map((result, index) => {
                                    let date = new Date(result.bitis_tarihi);
                                    date = date.toLocaleDateString()

                                    return (
                                        <tr key={index}>
                                            <td>{date}</td>
                                            <td>{rand_ip(index)}</td>
                                            <td>{result.tehdit_ad}</td>
                                        </tr>
                                    )
                                })
                          }
                          </tbody>
                      </table>
                  </div>
              </div>

              <div className="flex flex-col gap-3 p-4 bg-gray-800 rounded row-span-1 col-span-1">
                  <div className="text-white">Politika Uygulanma Oranları</div>
                  <Chart
                       className=""
                      options={policyOptions}
                      series={[{
                          name: 'Politika Uygulanma Oranları',
                          data: [95, 88, 96, 82, 91, 98],
                      }]}
                      type="bar"
                      width="400"
                      height="300"
                  />
              </div>

          </div>
      </div>
  )
}
