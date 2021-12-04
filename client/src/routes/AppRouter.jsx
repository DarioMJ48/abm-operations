import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Balance from '../components/Balance'
import OperationsList from '../components/OperationsList'
import AddOperation from '../pages/AddOperation'
import EditOperation from '../pages/EditOperation'

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => (
          <div className="container w-100 mb-4">
            <Balance />
            <div className="w-75">
              <OperationsList />
            </div>
          </div>
        )}/>
        <Route exact path="/add" render={() => (
          <div className="container w-50 mb-4">
            <AddOperation />
          </div>  
        )}/>
        <Route exact path="/edit" render={() => (
          <div className="container w-50 mb-4">
            <EditOperation />
          </div>
        )}/>
      </Switch>
    </Router>
  )
}

export default AppRouter
