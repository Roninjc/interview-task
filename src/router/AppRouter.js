import React from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { FullScreen } from '../components/FullScreen';
import { SmallScreen } from '../components/SmallScreen';

export const AppRouter = () => {

    return (
        <Router>
            <div>
                <Switch>

                    <Route
                        exact
                        path="/full"
                        component={ FullScreen }
                    />
                    <Route
                        exact
                        path="/mobile"
                        component={ SmallScreen }
                    />
                    <Redirect to="/full" />
                </Switch>
            </div>
        </Router>
    )
}
