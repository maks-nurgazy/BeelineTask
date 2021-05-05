import React, {useEffect} from "react";
import {Switch, Router, Route, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {history} from "../_helpers";
import {alertActions} from "../_actions";

import Home from './Home';
import LoginPage from './Login';
import PrivateRoute from "./helpers/PrivateRoute";
import Register from "./Register";
import Question from "./Question";
import NoMatch from "./NoMatch";


const App = () => {
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }, []);
    return (
        <div>
            {alert.message && (
                <div style={{backgroundColor: "red", fontSize:"22px"}}>{alert.message}</div>
            )}
            <Router history={history}>
                <div>
                    <Switch>
                        <PrivateRoute exact path="/" component={Home}/>
                        <PrivateRoute path="/tests/:test" component={Question}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={Register}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
