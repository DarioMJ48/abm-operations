import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Balance from '../pages/Balance'
import InflowsList from '../pages/InflowsList'
import OutflowsList from '../pages/OutflowsList'
import AddOperation from '../pages/AddOperation'
import EditOperation from '../pages/EditOperation'

const AppRouter = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path='/' render={() =>
                    <div className="container w-100 mb-4">
                        <Balance />
                        <div className="row">
                            <div className="col-6">
                                <h3>Inflows</h3>
                                <InflowsList />
                            </div>
                            <div className="col-6">
                                <h3>Outflows</h3>
                                <OutflowsList />
                            </div>
                        </div>
                    </div>
                } />
                <Route exact path="/add" render={() =>
                    <div className="container w-50 mb-4">
                        <AddOperation />
                    </div>
                } />
                <Route exact path="/edit" render={() =>
                    <div className="container w-50 mb-4">
                        <EditOperation />
                    </div>
                } />
            </Switch>
            <Footer />
        </Router>
    )
}

export default AppRouter
