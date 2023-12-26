import {NextUIProvider} from "@nextui-org/react";
import Script from "next/script";


export default function App({Component, ...props}) {

    return(
        <NextUIProvider>
            <Component {...props} />
        </NextUIProvider>
    )
}