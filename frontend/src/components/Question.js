import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {testKitActions} from "../_actions";
import Layout from "./Layout";
import Button from "./Button";
import styled from "styled-components";
import Result from "./Result";


const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 0 16px 24px 16px;
  box-sizing: border-box;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 2px;
  margin-bottom: 10px;
`;

const Item3 = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  font-size: 14px;
  letter-spacing: 1px;
  position: relative;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 10px;
  margin: 25px 0;
  padding: 10px;
  background: #1B93B8;
  color: #FFFFFF;
`;


const Item1 = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  font-size: 24px;
  position: relative;
  box-sizing: border-box;
  margin: 10px 0;
`;
const Item2 = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  position: relative;
  box-sizing: border-box;
`;
const Item4 = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  position: relative;
  box-sizing: border-box;
  margin: 10px 0 15px;
`;


const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  margin-right: 10px;

  &:hover ~ ${RadioButtonLabel} {
    background: #ccc;

    &::after {
      content: "";
      display: block;
      color: white;
    }
  }

  &:checked + ${Item} {
    background: red;
    border: 2px solid yellowgreen;
  }

  &:checked + ${RadioButtonLabel} {
    background: #FF1966;
    border: 1px solid yellowgreen;
    color: #FFFFFF;

    &::after {
      content: "";
      display: block;
      color: white;
    }
  }
`;
const End = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 25px 0 10px;
`

function Question(props) {
    const testKit = useSelector((state) => {
        return state.testKit;
    });
    let questions;
    if (testKit.testKitDetail) {
        questions = testKit.testKitDetail.questions;
    }
    const dispatch = useDispatch();
    const [ind, setInd] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState({});

    useEffect(() => {
        dispatch(testKitActions.getTestKitDetail(props.match.params.test));
    }, []);

    const increment = (e) => {
        e.preventDefault();
        if (answer.choice) {
            answers.push(answer);
            setInd(ind + 1);
            setSelect("");
        } else {
            alert("оставлять неотмеченными нельзя");
            return;
        }
        if (questions.length - ind <= 1) {
            dispatch(testKitActions.setAllAnswers(props.match.params.test, answers));
        }
    };


    const [select, setSelect] = useState("");

    const handleSelectChange = event => {
        const value = event.target.value;
        setSelect(value);
        setAnswer({
            question: questions[ind].id,
            choice: value,
            choice_text: questions[ind].options.find(e => e.choice === value).choice_text,
        });
    };
    return (
        <Layout>
            <Wrapper>
                {testKit.testResult && (
                    <Result result={testKit.testResult}/>
                )}
                {testKit.error && (
                    <span>ERROR: {testKit.error}</span>
                )}
                {questions && questions[ind] && (
                    <div>
                        <Item1>{testKit.testKitDetail.name}</Item1>
                        <Item2>Question {ind + 1} of {questions.length}</Item2>
                        <Item4>{questions[ind].text}</Item4>
                        <Item3>Choose one answer that most apply to you</Item3>
                        {
                            questions[ind].options.map((op, i) => {
                                return (
                                    <Item key={i}>
                                        <RadioButton
                                            type="radio"
                                            name="radio"
                                            value={op.choice}
                                            checked={select === op.choice}
                                            onChange={event => handleSelectChange(event)}
                                        />
                                        <RadioButtonLabel>{op.choice}</RadioButtonLabel>
                                        <div>{op.choice_text}</div>
                                    </Item>
                                )
                            })
                        }
                        <End>
                            <Button onClick={increment}>Continue</Button>
                        </End>
                    </div>
                )}
            </Wrapper>
        </Layout>
    );
}


export default Question;