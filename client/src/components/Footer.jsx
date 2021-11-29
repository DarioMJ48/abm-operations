import React from 'react'

const Footer = () => {
    const styleFooter = { width: "100%", bottom: "0", position: "fixed" }

    return (
        <nav className="navbar navbar-dark bg-dark" style={styleFooter}>
            <div className="container-fluid">
                <span className="text-center" style={{ color: "white" }}>
                    Darío Maximiliano Jiménez - &copy; {new Date().getFullYear()}
                </span>
            </div>
        </nav>
    )
}

export default Footer