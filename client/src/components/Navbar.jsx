import { useContext } from 'react'
import { AllContext } from '../contexts/AllContext'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setOps } from '../redux/ops'
import { setOpsListUpdated } from '../redux/opsListUpdated'

const Navbar = () => {
    const { username, setUsername, setUserId } = useContext(AllContext)
    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        setUsername('')
        setUserId('')
        dispatch(setOps([]))
        history.push('/login')
        setTimeout(() => { dispatch(setOpsListUpdated()) }, 1000)
    }

    return (
        <nav className="navbar navbar-dark bg-dark mb-4 border-0">
            <div className="container collapse navbar-collapse" id="navbarSupportedContent">
                <h6 className="navbar-nav me-4 mb-2 mb-lg-0">
                    <li className="navbar-item">
                        <Link className="nav-link active" to="/add">Add a new operation!</Link>
                    </li>
                </h6>
                <h3 className="nav-item dropdown">
                    <li className="nav-link dropdown-toggle me-4 mb-2 mb-lg-0 text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {username}
                    </li>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={logout}>LOGOUT</button></li>
                    </ul>
                </h3>
            </div>
        </nav>
    )
}

export default Navbar
