import styled from "styled-components";
import DatePicker from "react-datepicker";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
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
  justify-content: space-between;
`;

export const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin: 0 10px;
`;

export const Icon = styled.div`
  font-size: 30px;
  color: #00008b;
`;
