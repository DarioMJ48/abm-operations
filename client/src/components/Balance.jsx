import React from 'react'
import { useContext } from 'react'
import { AllContext } from '../contexts/AllContext'
import '../styles/balance.css'

const Balance = () => {
  const { ops } = useContext(AllContext)

  const calculateBalance = () => {
    let inflows = 0
    let outflows = 0
    ops.filter((op) => op.type == 'Inflow').map(op => inflows += op.amount)
    ops.filter((op) => op.type == 'Outflow').map(op => outflows += op.amount)
    const balance = inflows - outflows
    return balance
  }

  const final = calculateBalance()

  return <h1 className={final < 0 ? 'minor' : 'mayor'}>Balance: ${final}</h1>
}

export default Balance
