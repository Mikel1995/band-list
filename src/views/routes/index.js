import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';

const App = props => {
    return (
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/"  component={Home} exact />
          </Switch>
      </Router>
    )
}

App.propTypes = {

}

export default App;
