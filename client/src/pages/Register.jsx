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
        let emailInUse = false

        axios.get('http://localhost:3010/users/all')
            .then(res => registeredUsers = res.data)
            .catch(err => console.log(err))
        
        setTimeout(() => {
            if (Array.isArray(registeredUsers)) {
                registeredUsers.map(registeredUser => {
                    if (registeredUser.username === data.username) usernameInUse = true
                    if (registeredUser.email === data.email) emailInUse = true
                })
            }
        }, 500)

        setTimeout(() => {
            if (usernameInUse) {
                alert('Username already in use!')
            } else if (emailInUse) {
                alert('E-mail already in use!')
            } else {
                axios.post('http://localhost:3010/users/register', data)
                    .then(res => console.log(`User created! (${res.status} ${res.statusText})`))
                    .catch(err => console.log(err))
                
                history.push("/login")
            }
        }, 1000)
    }

    return (
        <div className="position-relative mx-auto" style={{ height: "100vh" }}>
            <h3 style={{"text-align": "center"}}>ABM Operations</h3>
            <div className="container position-absolute p-4 mb-2 top-50 start-50 translate-middle bg-white text-dark shadow rounded">
                <h1 style={{ "text-align": "center" }}>Register</h1>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <div className="mb-3">
                            <Field name="username" placeholder="Username" className="form-control" />
                            <ErrorMessage name="username" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <Field name="email" placeholder="E-mail" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <Field name="password" type="password" placeholder="Password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <button type="submit" class="btn btn-info w-100" style={{color: "white", "font-weight": "bold"}}>Register</button>
                    </Form>
                </Formik >
                <Link className="nav-link active" to="/login" style={{"text-align": "center"}}>Or Log In?</Link>
            </div>
        </div> 
    )
}

export default Register
