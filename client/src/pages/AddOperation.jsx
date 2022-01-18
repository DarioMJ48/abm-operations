import React, { useContext } from 'react'
import { AllContext } from '../contexts/AllContext'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setOps } from '../redux/ops'
import { setOpsValues } from '../redux/opsValues'
import { setOpsListUpdated } from '../redux/opsListUpdated'

const AddOperation = () => {
  const { userId } = useContext(AllContext)
  const history = useHistory()
  const dispatch = useDispatch()

  const initialValues = {
    concept: '',
    amount: 0,
    date: new Date(),
    type: 'Inflow',
    category: 'Food',
    UserId: userId
  }

  const validationSchema = yup.object().shape({
    concept: yup.string().required('Field required!'),
    amount: yup.number().min(1).required('Field required!'),
    date: yup.date().required('Field required!'),
    type: yup.string().required('Field required!'),
    category: yup.string().required('Field required!'),
  })

  const onSubmit = (data) => {
    axios.post('http://localhost:3010/operations/add', data)
      .then((res) => console.log(`Operation added! (${res.status} ${res.statusText})`))
      .catch(err => console.log(err))

    dispatch(setOpsValues({ type: 'All', category: 'All' }))
    dispatch(setOpsListUpdated())
    setTimeout(function () {
      dispatch(setOpsListUpdated())
  }, 3000)
    history.push('/abm')
  }

  return (
    <div className="container p-4 m-2 bg-white text-dark shadow rounded">
      <h1 style={{"text-align": "center"}}>Add operation</h1>
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
              <DatePicker selected={values.date} dateFormat="MMMM d, yyyy" className="form-control" name="date" onChange={(selected) => setFieldValue('date', selected)} />
            </div>
            <div className="mb-3">
              <label />Type
              <ErrorMessage name="type" component="div" class="text-danger" />
              <Field as="select" name="type" className="form-control">
                <option>Inflow</option>
                <option>Outflow</option>
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
            <button type="submit" class="btn btn-success w-100">Add operation</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddOperation
