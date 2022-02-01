import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';
import BodyContent from '../pages/BodyContent';
import Signup from '../components/SignUp/Signup';

const App = props => {
    return (
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Signup} />
            <Route path="/">
              <BodyContent content={<Home />} />
            </Route>
          </Switch>
      </Router>
    )
}

App.propTypes = {

}

export default App;
