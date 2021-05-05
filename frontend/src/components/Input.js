import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
          display: flex;
          flex-direction: column;
          position: relative;
          margin: 30px 0 15px;
          width: ${props => props.width};

          & > input {
            border: 1px solid ${props => (props.error ? "#e77674" : "#D0D4D9")};
            border-radius: 12px;
            background-color: transparent;
            outline: none;
            padding: 12px 3px 12px 15px;
            font-size: 16px;
            transition: all 0.2s ease;
            z-index: 500;
          }

          & > label {
            color: #757575;
            position: absolute;
            top: 15px;
            left: 15px;
            transition: all 0.2s ease;
            z-index: 500;

            ${props =>
                    props.focused &&
                    `
      font-size: 13px;
      transform: translateY(-23px) translateX(-5px);
      z-index: 501;
      background: white;
      padding: 0 8px;
    `}
          }
    `
;
const Input = ({
                   value,
                   type,
                   label,
                   onChange,
                   onFocus,
                   onBlur,
                   setRef,
                   ...props
               }) => {
    const [focused, setFocused] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleOnFocus = () => {
        setFocused(true);
        onFocus();
    };

    const handleOnBlur = () => {
        setFocused(false);
        onBlur();
    };

    const validateValue = val => {
        if (type === "email") {
            // VERY simple email validation
            if (val.indexOf("@") === -1) {
                setError("email is invalid");
            } else {
                setError(null);
            }
        }

    };

    const handleOnChange = val => {
        validateValue(val.target.value);
        onChange(val);
    };

    const renderLabel = () => {
        if (label) {
            if (error) {
                return <label>{error}</label>;
            }

            return <label>{label}</label>;
        }
        return null;
    };

    const isFocused = focused || String(value).length || type === "date";
    return (
        <InputContainer focused={isFocused} error={error} width={props.width}>
            {renderLabel()}
            <input
                value={value}
                type={type}
                onChange={e => handleOnChange(e)}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                ref={ref => setRef(ref)}
                {...props}
            />
        </InputContainer>
    );
};

Input.defaultProps = {
    type: "text",
    label: "",
    onChange: text => {
        console.error(
            `Missing onChange prop: ${text}`
        );
    },
    onFocus: () => {
    },
    onBlur: () => {
    },
    setRef: () => {
    }
};

export default Input;
