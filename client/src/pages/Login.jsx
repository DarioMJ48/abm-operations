import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AllContext } from '../contexts/AllContext'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

const Register = () => {
    const { setOpsListUpdated, setUsername, setUserId } = useContext(AllContext)
    const history = useHistory()
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get('http://localhost:3010/userslogin')
            .then((response) => { response.data.user ? console.log(response.data.user) : console.log('No user logged in.') })
            .catch(err => console.log(err))
    }, [])

    const initialValues = {
        username: "",
        password: "",
    }

    const validationSchema = yup.object().shape({
        username: yup.string().required('Field required!'),
        password: yup.string().required('Field required!'),
    })

    const onSubmit = (data) => {
        axios.post('http://localhost:3010/users/login', data)
            .then(res => {
                if (res.data) {
                    setUsername(res.data.username)
                    setUserId(res.data.userId)
                } else {
                    setUsername(res.data)
                }
            })
            .catch(err => console.log(err))
        
        history.push("/abm")
        setTimeout(function () {
            setOpsListUpdated(true)
        }, 3000)
    }

    return (
        <>
        <h1 className="container">Log In!</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <div className="mb-3">
                    <label />Username
                    <ErrorMessage name="username" component="div" className="text-danger" />
                    <Field name="username" placeholder="Username..." className="form-control" />
                </div>
                <div className="mb-3">
                    <label />Password
                    <ErrorMessage name="password" component="div" className="text-danger" />
                    <Field name="password" placeholder="Password..." className="form-control" />
                </div>
                <button type="submit" class="btn btn-success w-100">Log In</button>
            </Form>
        </Formik >
        <Link className="nav-link active" to="/register">Or Register?</Link>
        </>
    )
}

export default Register
