import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/balance.css'

const Balance = () => {
  const ops = useSelector((state) => state.ops.value)

  const calculateBalance = () => {
    let inflows = 0
    let outflows = 0
    ops.filter((op) => op.type == 'Inflow').map(op => inflows += op.amount)
    ops.filter((op) => op.type == 'Outflow').map(op => outflows += op.amount)
    const balance = inflows - outflows
    return balance
  }

  const finalBalance = calculateBalance()

  return <h1 className={finalBalance < 0 ? 'minor' : 'mayor'}>Balance: ${finalBalance}</h1>
}

export default Balance
