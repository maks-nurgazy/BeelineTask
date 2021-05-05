import React from 'react';
import styled from 'styled-components';


const CardContainer = styled.div`
  background: #1B93B8;
  border-radius: 10px;
  padding: 0 10px;
  cursor: pointer;
  height: 100%;
`;

const Title = styled.h2`
  color: #FFFFFF;
  font-size: 1.5rem;
  line-height: 1.6rem;
  letter-spacing: 0.1em;
  margin-top: 0;
  padding-top: 20px;
`;

const SubTitle = styled.h5`
  color: #000000;
  font-size: 18px;
  line-height: 21px;
`;


const Card = ({title, subTitle}) => (
    <CardContainer>
        <Title>{title}</Title>
        <SubTitle>{subTitle} questions</SubTitle>
    </CardContainer>
);

export default Card;