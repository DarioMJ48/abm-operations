import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

const Register = () => {
    const history = useHistory()

    const initialValues = {
        username: "",
        email: "",
        password: ""
    }

    const validationSchema = yup.object().shape({
        username: yup.string().required('Field required!'),
        email: yup.string().email('Invalid e-mail!').required('Field required!'),
        password: yup.string().required('Field required!'),
    })
    
    const onSubmit = (data) => {
        let registeredUsers = []
        let usernameInUse = false

        axios.get('http://localhost:3010/users/all')
            .then(res => registeredUsers = res.data)
            .catch(err => console.log(err))
        
        setTimeout(() => {
            if (Array.isArray(registeredUsers)) {
                registeredUsers.map(registeredUser => {
                    if (registeredUser.username === data.username) usernameInUse = true                 
                })
            }
        }, 500)

        setTimeout(() => {
            if (usernameInUse) {
                alert('Username already in use!')
            } else {
                axios.post('http://localhost:3010/users/register', data)
                    .then(res => console.log(`User created! (${res.status} ${res.statusText})`))
                    .catch(err => console.log(err))
                
                history.push("/login")
            }
        }, 1000)
    }

    return (
        <>
        <h1 className="container">Register!</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <div className="mb-3">
                    <label />Username
                    <ErrorMessage name="username" component="div" className="text-danger" />
                    <Field name="username" placeholder="Username..." className="form-control" />
                </div>
                <div className="mb-3">
                    <label />E-mail
                    <ErrorMessage name="email" component="div" className="text-danger" />
                    <Field name="email" placeholder="E-mail..." className="form-control" />
                </div>
                <div className="mb-3">
                    <label />Password
                    <ErrorMessage name="password" component="div" className="text-danger" />
                    <Field name="password" placeholder="Password..." className="form-control" />
                </div>
                <button type="submit" class="btn btn-success w-100">Register</button>
            </Form>
        </Formik >
        <Link className="nav-link active" to="/login">Or Log In?</Link>
        </>
    )
}

export default Register
