import React from 'react'
import Navbar from '../components/Navbar'
import Balance from '../components/Balance'
import OperationsList from '../components/OperationsList'

const MyOperations = () => {    
    return (
        <>
          <Navbar />
          <div className="px-4">
            <Balance />
            <div className="w-75">
              <OperationsList />
            </div>
          </div>
        </>
    )
}

export default MyOperations
