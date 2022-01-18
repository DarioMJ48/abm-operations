import React, { useEffect, useContext } from 'react'
import { AllContext } from '../contexts/AllContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Balance from '../components/Balance'
import OperationsList from '../components/OperationsList'
import { useSelector, useDispatch } from 'react-redux'
import { setOps } from '../redux/ops'


const MyOperations = () => {
  console.log('myOperations')
  const { userId } = useContext(AllContext)
  const dispatch = useDispatch()
  const ops = useSelector((state) => state.ops.value)
  const opToEdit = useSelector((state) => state.opToEdit.value)
  const opsValues = useSelector((state) => state.opsValues.value)
  const opsListUpdated = useSelector((state) => state.opsListUpdated.value)
  const loading = useSelector((state) => state.loading.value)

  useEffect(() => {
    axios.get(`http://localhost:3010/users/id/${userId}`)
      .then((res) => dispatch(setOps(res.data.Operations.reverse())))
      .catch(error => console.error(error))
      
  }, [userId, opsListUpdated, loading])
    
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
