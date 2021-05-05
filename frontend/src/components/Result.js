import React from 'react';
import Layout from "./Layout";
import styled from 'styled-components';
import {GiFinishLine} from "react-icons/gi";
import {ImMinus} from "react-icons/im";
import {BiPlusMedical} from "react-icons/bi";
import {FaPercentage} from "react-icons/fa";


const Wrapper = styled.div`
  width: 50%;
  margin: 15px auto;
  @media (max-width: 730px) {
    width: 90%;
  }
`;

const Item2 = styled.div`
  display: flex;
  justify-content: center;
  font-size: 10rem;
`;

const Item = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    font-size: 4rem;
  }

  & > span {
    margin: 40px;
    color: #545151;
  }

  & > span:nth-child(3) {
    font-size: 24px;
    margin-left: auto;
  }
`;

function Result({result}) {
    return (
        <div>
            <Item2><GiFinishLine/></Item2>
            <Wrapper>
                <Item>
                    <BiPlusMedical/>
                    <span>Correct</span>
                    <span>{result.correct}</span>
                </Item>
                <Item>
                    <ImMinus/>
                    <span>Incorrect</span>
                    <span>{result.incorrect}</span>
                </Item>
                <Item>
                    <FaPercentage/>
                    <span>Percentage</span>
                    <span>{result.percentage}%</span>
                </Item>
            </Wrapper>
        </div>
    );
}
Result.defaultProps={
    result:{
        correct:10,
        incorrect:34,
        percentage:45,
    }
}

export default Result;