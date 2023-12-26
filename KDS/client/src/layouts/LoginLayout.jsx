

function LoginLayout({children}) {
    return(
        <div style={{
            backgroundImage: "url(/images/hitler.jpg)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '100vh',
        }}
             className="flex items-center justify-center"
        >
            {children}
        </div>
    )
}

export default LoginLayout;