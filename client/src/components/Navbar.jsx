import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AllContext } from '../contexts/AllContext'

const Header = () => {
    const {username} = useContext(AllContext)
    return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <div className="container">
                <ul className="navbar-nav me-4 mb-2 mb-lg-0">
                    <h3 className="navbar-light">
                        <Link className="nav-link active" to="/abm">{username}</Link>
                    </h3>
                </ul>
                <ul className="navbar-nav me-4 mb-2 mb-lg-0">
                    <li className="navbar-item">
                        <Link className="nav-link active" to="/add">Add a new operation!</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
