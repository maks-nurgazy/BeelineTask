import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {testActions} from "../_actions";

import Layout from './Layout';
import TestKit from "./TestKit";
import {TitleH3} from "./Title";

const Home = () => {
    const tests = useSelector((state) => state.tests);
    const user = useSelector((state) => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(testActions.getAllTests());
    }, []);
    return (
        <Layout>
            <TitleH3>TestKit</TitleH3>
            <TestKit tests={tests}/>
        </Layout>
    );
};

export default Home;
