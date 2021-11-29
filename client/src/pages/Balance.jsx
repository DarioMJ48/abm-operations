import React from 'react'
import { useContext } from 'react'
import { AllContext } from '../contexts/AllContext'
import '../styles/balance.css'

const Balance = () => {
    const { opsI, opsO } = useContext(AllContext)
    let inflows = 0
    let outflows = 0

    const calculateBalance = () => {
        opsO.map(op => { outflows += op.amount })
        opsI.map(op => { inflows += op.amount })
        let balance = inflows - outflows
        return balance
    }

    const final = calculateBalance()

    return (

        <h1 className={final < 0 ? "minor" : "mayor"}>Balance: ${final}</h1>
    )
}

export default Balance
