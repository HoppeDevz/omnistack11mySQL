import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident/index';

class Routes extends Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Logon} />
                    <Route path='/register' component={Register} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/incidents/NewIncident' component={NewIncident} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes;