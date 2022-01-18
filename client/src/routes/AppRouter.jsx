import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import AddOperation from '../pages/AddOperation'
import EditOperation from '../pages/EditOperation'
import MyOperations from '../pages/MyOperations'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="register" />
        )} />
        <Route exact path="/register" render={() => (
          <div className="container w-50">
            <Register />
          </div>
        )} />
        <Route exact path="/login" render={() => (
          <div className="container w-50">
            <Login />
          </div>
        )} />
        <Route exact path="/abm" render={() => (
          <MyOperations />         
        )} />
        <Route exact path="/add" render={() => (
          <div className="container w-50 mb-4">
            <AddOperation />
          </div>  
        )} />
        <Route exact path="/edit" render={() => (
          <div className="container w-50 mb-4">
            <EditOperation />
          </div>
        )} />
      </Switch>
    </Router>
  )
}

export default AppRouter
