import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../_actions";
import Input from './Input'
import Button from './Button';
import "./layout.css";
import {TitleH3} from "./Title";


const Register = () => {

    const [user, setUser] = useState({
        first_name: "",
        email: "",
        last_name: "",
        username: "",
        password: "",
        password2: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector((state) => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (
            user.first_name &&
            user.last_name &&
            user.email &&
            user.username &&
            user.password &&
            user.password2
        ) {
            console.log(`user`, user);
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="container">
            <TitleH3>Register</TitleH3>
            <form name="form" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    label="Firstname"
                    name="first_name"
                    value={user.first_name}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    label="Lastname"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    label="Username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    label="Password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    label="Confirm password"
                    name="password2"
                    value={user.password2}
                    onChange={handleChange}
                />
                <div className={"mt-3 pull-right"}>
                    <Button type={"submit"}>Register</Button>
                </div>
            </form>
            <div className={"centerX mt-3 mb-3"}>
                <Link to="/login">
                    <button className={"btnNone"}>Already have account?
                        <span className={"font-2"}>Login</span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Register;
