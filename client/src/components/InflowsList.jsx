import React from 'react'
import Loading from '../components/Loading'
import useOperations from '../hooks/useOperations'

const InflowsList = () => {
    const [opsI, opsO, handleUpdate, handleDelete, loading] = useOperations()

    const opType = 'Inflow'

    return (
        <>
            <h5 className="text-black-50">Last ten entries</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th>Concept</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && < Loading />}
                    {opsI.slice(0, 10).map(op => (
                        <tr key={op.id}>
                            <td>{op.concept}</td>
                            <td>{op.amount}</td>
                            <td>{op.date.toString().slice(2, 10)}</td>
                            <td>{op.category}</td>
                            <td>
                                <div className="mb-1">
                                    <button onClick={() => { handleUpdate(op, opType) }} className="btn btn-dark">Edit</button>
                                </div>
                                <div className="mb-1">
                                    <button onClick={() => { handleDelete(op.id, opType) }} className="btn btn-danger">DEL</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default InflowsList
