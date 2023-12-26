'use client';

import {useEffect} from "react";
import 'svgmap/dist/svgMap.min.css';

function Map() {

    useEffect(() => {

        const svgMap = require("svgmap")

        if(typeof svgMap !== "undefined") {
            new svgMap({
                targetElementID: 'svgMap',
                data: {
                    data: {
                        threats: {
                            name: 'Tehdit Sayısı',
                            format: '{0} Adet',
                            thousandSeparator: ',',
                            thresholdMax: 5000,
                            thresholdMin: 500
                        }
                    },
                    applyData: 'threats',
                    values: {
                        RU: {threats: 1182},
                        US: {threats: 111},
                        CN: {threats: 2942},
                        IN: {threats: 512},
                        JP: {threats: 182},
                        BR: {threats: 1024},
                    }
                },
                noDataText: 'Veri Yok',
            });
        }


    }, []);

    return(
        <div className="p-4">
            <div className="my-4 text-gray-300 font-2xl border-b border-gray-300 pb-2">
                TEHDİT HARİTASI
            </div>


            <div className="bg-gray-800 p-4 max-h-full h-full rounded">
                <div id="svgMap">

                </div>
            </div>
        </div>
    )
}


export default Map;