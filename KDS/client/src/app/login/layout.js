import LoginLayout from "@/layouts/LoginLayout";


export const metadata  = {
    title: 'Admin Login'
}
function Layout({children}) {
    return(
        <LoginLayout>
            {children}
        </LoginLayout>
    )
}

export default Layout;