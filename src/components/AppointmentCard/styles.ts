import styled from "styled-components";

// Define the props type
interface StatusTextProps {
  status: boolean;
}

export const AppointmentItem = styled.li`
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  width: 100%;
`;

export const AppointmentDetails = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-bottom: 5px;

    strong {
      font-weight: bold;
    }
  }
`;

export const StatusText = styled.div<StatusTextProps>`
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.status ? "green" : "grey")};
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  h2 {
    margin-bottom: 20px;
  }

  button {
    margin-right: 10px;
  }
`;
