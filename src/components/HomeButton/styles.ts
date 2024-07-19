import styled from "styled-components";

interface ButtonContainerProps {
  bgColor?: string;
}

interface ButtonTextProps {
  textColor?: string;
}

export const ButtonContainer = styled.div<ButtonContainerProps>`
  display: inline-block;
  padding: 12px 24px;
  border-radius: 9999px;
  background-color: ${({ bgColor }) => bgColor || "#00008b"};
  cursor: pointer;
  transition: all 0.3s ease;
`;

export const ButtonText = styled.p<ButtonTextProps>`
  font-size: 16px;
  color: ${({ textColor }) => textColor || "white"};
  font-weight: 400;
  margin: 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: ${({ textColor }) => textColor || "white"};
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  ${ButtonContainer}:hover &::after {
    opacity: 1;
  }
`;
