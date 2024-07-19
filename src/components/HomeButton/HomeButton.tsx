import React from "react";
import { Link } from "react-router-dom";
import { ButtonContainer, ButtonText } from "./styles";

interface HomeButtonProps {
  to: string;
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({
  to,
  children,
  bgColor,
  textColor,
}) => {
  return (
    <Link to={to}>
      <ButtonContainer bgColor={bgColor}>
        <ButtonText textColor={textColor}>{children}</ButtonText>
      </ButtonContainer>
    </Link>
  );
};

export default HomeButton;
