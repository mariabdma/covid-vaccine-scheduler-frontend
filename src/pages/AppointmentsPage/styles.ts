import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
`;

export const Header = styled.header`
  background: #f5f5f5;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

export const Content = styled.div`
  margin-top: 20px;
  flex: 1;
  overflow-y: auto;
`;

export const AppointmentDateGroup = styled.div`
  margin-bottom: 20px;
`;

export const AppointmentTimeGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  gap: 20px;
  width: 100%;
`;

export const AppointmentList = styled.div`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  margin: 0;
`;
