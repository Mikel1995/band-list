import React from 'react'
import PropTypes from 'prop-types'
import Home from '../components/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const App = props => {
    return (
        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    )
}

App.propTypes = {

}

export default App;
