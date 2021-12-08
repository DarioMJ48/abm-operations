import React, { useContext, useRef, useReducer } from 'react'
import { AllContext } from '../contexts/AllContext'
import Loading from './Loading'
import useOperationsReducer, { ACTIONS } from '../reducers/useOperationsReducer'

const Operations = () => {
  const { ops, opsValues, setOpToEdit, setOpsValues, setOpsListUpdated, loading, user } = useContext(AllContext)
  const opsToRender = useRef([])
  const [state, dispatch] = useReducer(useOperationsReducer, {})
  
  const opsFilter = () => {
    if (opsValues.type === 'All' & opsValues.category === 'All') opsToRender.current = ops.filter(op => op)
    if (opsValues.type === 'All' & opsValues.category != 'All') opsToRender.current = ops.filter(op => op.category === opsValues.category) 
    if (opsValues.type != 'All' & opsValues.category === 'All') opsToRender.current = ops.filter(op => op.type === opsValues.type) 
    if (opsValues.type != 'All' & opsValues.category != 'All') opsToRender.current = ops.filter(op => op.type === opsValues.type && op.category === opsValues.category) 
  }
  
  opsFilter()

  const handleChange = e => {
    const value = e.target.value 
    setOpsValues({
      ...opsValues,
      [e.target.name]: value
    })
    dispatch({type: ACTIONS.CHANGE})
  }

  const handleUpdate = op => {
    setOpToEdit(op)
    dispatch({ type: ACTIONS.UPDATE })
  }

  const handleDelete = id => {
    setOpsListUpdated(true)
    dispatch({ type: ACTIONS.DELETE, payload: { id: id } })
  }

  return (
    <>
      <h3 className="mb-3">Operations</h3>
      <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name ="type" onChange={handleChange}>
        <option value="All" defaultValue>All</option>
        <option value="Inflow">Inflows</option>
        <option value="Outflow">Outflows</option>
      </select>
      <select className="form-select" aria-label="Default select example" name ="category" onChange={handleChange}>
        <option value="All" defaultValue>All</option>
        <option value="Food">Food</option>
        <option value="Bets">Bets</option>
        <option value="Going out">Going out</option>
        <option value="Job">Job</option>
        <option value="Illegal">Illegal</option>
      </select>
      <h5 className="text-black-50 mt-3">Last ten entries</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>   
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading && <Loading />}
          {opsToRender.current.slice(0, 10).map((op) => (
            <tr key={op.id}>
              <td>{op.concept}</td>
              <td>{op.amount}</td>
              <td>{op.date.toString().slice(2, 10)}</td>
              <td>{op.type}</td>
              <td>{op.category}</td>
              <td>
                <div className="mb-1">
                  <button onClick={() => handleUpdate(op)} className="btn btn-dark mx-1">Edit</button>
                  <button onClick={() => { handleDelete(op.id) }} className="btn btn-danger mx-1">DEL</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Operations
