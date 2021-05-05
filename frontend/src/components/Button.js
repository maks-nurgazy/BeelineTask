import React from "react";
import styled, {ThemeProvider} from "styled-components";

const ButtonContainer = styled.button`
  background: ${props => props.theme.background};
  color: ${props => props.theme.color};
  font-size: 20px;
  text-align: center;
  mix-blend-mode: lighten;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 300px;
  padding: 15px 60px;
  border: none;
  transition: 3s;
  cursor: pointer;

  :hover {
    background: linear-gradient(91.5deg, #1699A3 0.97%, #11CBD9 95.53%);
  }
`;


const Button = (props) => {
    return (
        <ThemeProvider theme={props.theme}>
            <ButtonContainer
                type={props.type}
                onClick={e => props.onClick(e)}
                className={props.className}>{props.children}</ButtonContainer>
        </ThemeProvider>
    );
};

Button.defaultProps = {
    type: "submit",
    value: "Button",
    onClick: () => {
    },
    theme: {
        background: "linear-gradient(91.5deg, #B4BCB7 0.97%, #888989 95.53%)",
        color: "#FFFDFD"
    }
};

export default Button;