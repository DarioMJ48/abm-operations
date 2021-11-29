import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = () => {
    const [opsI, setOpsI] = useState([])
    const [opsO, setOpsO] = useState([])
    const [opToEdit, setOpToEdit] = useState()
    const [opsListUpdated, setOpsListUpdated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:3010/inflows').then(res => setOpsI(res.data.reverse()))
        axios.get('http://localhost:3010/outflows').then(res => setOpsO(res.data.reverse()))
        setOpsListUpdated(false)
        setLoading(false)
    }, [opsListUpdated])

    return [opsI, opsO, setOpsListUpdated, opToEdit, setOpToEdit, loading]
}

export default useFetch
