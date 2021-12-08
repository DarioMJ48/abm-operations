import { useContext } from 'react'
import { AllContext } from '../contexts/AllContext'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'


const Navbar = () => {
    const {username, setUserId} = useContext(AllContext)
    const history = useHistory()

    const logout = () => {
        setUserId('')
        history.push('/login')
    }

    return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <div className="container">
                <ul className="navbar-nav me-4 mb-2 mb-lg-0">
                    <h3 className="navbar-light">
                        <Link className="nav-link active" to="/abm">{username}</Link>
                    </h3>
                    <h6 className="navbar-light">
                        <button className="btn btn-secondary btn-lg active" role="button" to="/login" onClick={logout}>Log Out</button>
                    </h6>
                </ul>
                <ul className="navbar-nav me-4 mb-2 mb-lg-0">
                    <h3 className="navbar-light">
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

export default Navbar
