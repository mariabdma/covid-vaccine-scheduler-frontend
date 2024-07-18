import React from "react";
import { Link } from "react-router-dom";
import { ButtonContainer, ButtonText } from "./styles";

interface HomeButtonProps {
  to: string;
  children: React.ReactNode;
}
const HomeButton: React.FC<HomeButtonProps> = ({ to, children }) => {
  return (
    <Link to={to}>
      <ButtonContainer>
        <ButtonText>{children}</ButtonText>
      </ButtonContainer>
    </Link>
  );
};

export default HomeButton;
