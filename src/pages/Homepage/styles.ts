import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-left: 10px;
`;

export const CalendarTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-left: 10px;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 1600px;
  justify-content: center;
  gap: 10px;
`;

export const ScheduleSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
`;

export const AppointmentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
`;
export const DescriptionBox = styled.div`
  width: 280px;
  font-size: 22px;
  font-weight: 300;
`;

export const Icon = styled.div`
  font-size: 30px;
  color: #00008b;
`;
