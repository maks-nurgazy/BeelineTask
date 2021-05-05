import React from 'react';
import {AiOutlineUser} from "react-icons/ai";
import styled from 'styled-components';


const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 24px;
  align-items: center;

  & > span {
    margin-right: 15px;
  }

  & > svg {

  }

`;

const Border = styled.div`
  border: 1px solid #8D8D8D;
  margin: 40px 0 20px;
  padding: 0 40px;
  min-height: 75vh;;
`;
const LayoutContainer = styled.div`
  width: 75%;
  margin: 20px auto 1rem;
`;

const Layout = ({children}) => {
    const username = JSON.parse(localStorage.getItem('username'));
    return (
        <LayoutContainer>
            <Header>
                <span>{username}</span>
                <AiOutlineUser/>
            </Header>
            <Border>
                {children}
            </Border>
        </LayoutContainer>
    );
};

export default Layout;
