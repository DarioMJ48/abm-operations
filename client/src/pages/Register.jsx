import React, { useState } from 'react'
import { useContext } from 'react'
import { AllContext } from '../contexts/AllContext'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

const Register = () => {
    const {user, setUser} = useContext(AllContext)
    const history = useHistory()

    const initialValues = {
        username: "",
        password: "",
    }

    const validationSchema = yup.object().shape({
        username: yup.string().required('Field required!'),
        password: yup.string().required('Field required!'),
    })

    const onSubmit = (data) => {
        axios.post('http://localhost:3010/users/register', data)
            .catch(err => console.log(err))
            .then(res => console.log(`User created! (${res.status} ${res.statusText})`))
                
        history.push("/login")
    }

    return (
        <>
        <h1 className="container">Register!</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <div className="mb-3">
                    <label />Username
                    <ErrorMessage name="username" component="div" class="text-danger" />
                    <Field name="username" placeholder="Username..." className="form-control" />
                </div>
                <div className="mb-3">
                    <label />Password
                    <ErrorMessage name="password" component="div" class="text-danger" />
                    <Field name="password" placeholder="Password..." className="form-control" />
                </div>
                <button type="submit" class="btn btn-success w-100">Register</button>
            </Form>
        </Formik >
        </>
    )
}

export default Register
