import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useDispatch, useSelector } from 'react-redux'
import { setOpsValues } from '../redux/opsValues'
import { setOpsListUpdated } from '../redux/opsListUpdated'

const EditOperation = () => { 
    const history = useHistory()
    const dispatch = useDispatch()
    const opToEdit = useSelector((state) => state.opToEdit.value)
    
    const initialValues = {
        concept: opToEdit.concept,
        amount: opToEdit.amount,
        date: new Date(opToEdit.date),
        type: opToEdit.type,
        category: opToEdit.category,
    }

    const validationSchema = yup.object().shape({
        concept: yup.string().required('Field required!'),
        amount: yup.number().min(1).required('Field required!'),
        date: yup.date().required('Field required!'),
        type: yup.string().required('Field required!'),
        category: yup.string().required('Field required!')
    })
    
    const onSubmit = (data) => {
        axios.put(`http://localhost:3010/operations/update/${opToEdit.id}`, data)
            .then(res => console.log(`Operation updated! `))
            .catch(err => console.log(err))
            
        dispatch(setOpsValues({ type: 'All', category: 'All' }))
        dispatch(setOpsListUpdated())
        setTimeout(function () {
            dispatch(setOpsListUpdated())
        }, 500)
        history.push("/abm")
    }

    return (
        <div className="container p-4 m-2 bg-white text-dark shadow rounded">
            <h1 style={{"text-align": "center"}}>Edit operation #{opToEdit.id}</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="mb-3">
                            <label />Concept
                            <ErrorMessage name="concept" component="div" class="text-danger" />
                            <Field name="concept" placeholder="Your concept here!" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label />Amount
                            <ErrorMessage name="concept" component="div" class="text-danger" />
                            <Field name="amount" placeholder="How much?" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label />Date
                            <ErrorMessage name="date" component="div" class="text-danger" />
                            <DatePicker
                                selected={values.date}
                                dateFormat="MM-dd-yyyy"
                                className="form-control"
                                name="date"
                                onChange={selected => setFieldValue('date', selected)}
                            />
                        </div>
                        <div className="mb-3">
                            <label />Type
                            <ErrorMessage name="type" component="div" class="text-danger" />
                            <Field as="select" name="type" className="form-control" disabled>
                                <option>{opToEdit.type}</option>
                            </Field>
                        </div>
                        <div className="mb-3">
                            <label />Category
                            <ErrorMessage name="category" component="div" class="text-danger" />
                            <Field as="select" name="category" className="form-control">
                                <option>Food</option>
                                <option>Bets</option>
                                <option>Going out</option>
                                <option>Job</option>
                                <option>Illegal</option>
                            </Field>
                        </div>
                        <button type="submit" class="btn btn-success w-100">Update operation</button>
                    </Form>
                )}
            </Formik >
        </div>
    )
}

export default EditOperation
