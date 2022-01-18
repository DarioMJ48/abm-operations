import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AllContext } from '../contexts/AllContext'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setOpsListUpdated } from '../redux/opsListUpdated'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

const Login = () => {
    const { setUsername, setUserId } = useContext(AllContext)
    const history = useHistory()
    const dispatch = useDispatch()
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get('http://localhost:3010/users/checklogin')
            .then((response) => { response.data.user ? console.log('USER LOGGED IN.') : console.log('NO USER LOGGED IN.') })
            .catch(err => console.log(err))
    }, [])

    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid e-mail!').required('Field required!'),
        password: yup.string().required('Field required!'),
    })

    const onSubmit = (data) => {
        axios.post('http://localhost:3010/users/login', data)
            .then(res => {
                if (typeof res.data === 'object' && res.data !== null) {
                    setUsername(res.data.username)
                    setUserId(res.data.id)
                    history.push("/abm")
                    setTimeout(() => { dispatch(setOpsListUpdated()) }, 500)    
                } else {
                    alert('INCORRET USERNAME OR PASSWORD.')
                }
            })
            .catch(err => console.log(err))
    }

    return (  
        <div className="position-relative mx-auto" style={{ height: "100vh" }}>
            <h3 style={{"text-align": "center"}}>ABM Operations</h3>
            <div className="container position-absolute p-4 mb-2 top-50 start-50 translate-middle bg-white text-dark shadow rounded">
                <h1 style={{"text-align": "center"}}>Log In</h1>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <div className="mb-3">       
                            <Field name="email" placeholder="E-mail" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <Field name="password" type="password" placeholder="Password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <button type="submit" class="btn btn-info w-100 text-white fw-bold">Log In</button>
                    </Form>
                </Formik >
                <Link className="nav-link active" to="/register" style={{"text-align": "center"}}>Or Register?</Link>
            </div>
        </div>
    )
}

export default Login
