import styled from "styled-components";

export const FormField = styled.div`
  font-weight: 400;
  margin-bottom: 20px;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 15px;
  font-weight: 600;
  margin-top: 5px;
`;

export const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
