import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {userActions} from '../_actions';
import Input from './Input';
import Button from './Button';
import {TitleH3} from "./Title";
import "./layout.css";


const LoginPage = () => {

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const {username, password} = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const {from} = location.state || {from: {pathname: "/"}};
            dispatch(userActions.login(username, password, from));
        }
    }

    return (
        <div className={"center"}>
            <div className="container">
                <TitleH3>Login</TitleH3>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        label="Username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                    {submitted && !username &&
                    <div className="invalid-feedback">Username is required</div>
                    }
                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    {submitted && !password &&
                    <div className="invalid-feedback">Password is required</div>
                    }
                    <div className={"mt-3 pull-right"}>
                        <Button type={"submit"}>Login</Button>
                    </div>
                </form>
                <div className={"centerX mt-3"}>
                    <Link to="/register">
                        <button className={"btnNone"}>Don't have account?
                            <span className={"font-2"}>Sign up</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
