import styled from "styled-components";

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
