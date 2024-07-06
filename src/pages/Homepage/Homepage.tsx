import React from "react";
import { HomeButton } from "../../components";
import {
  Container,
  Header,
  Title,
  Content,
  Section,
  Icon,
  CalendarTitle,
} from "./styles";
import { FaSyringe } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Homepage(): JSX.Element {
  return (
    <Container>
      <Header>
        <Icon>
          <FaSyringe />
        </Icon>
        <Title>Portal de Vacinação COVID-19</Title>
      </Header>
      <Content>
        <Section>
          <HomeButton to="/schedule">
            Agende uma consulta de vacinação COVID 19
          </HomeButton>
        </Section>
        <Section>
          <CalendarTitle>
            {" "}
            Verifique as consultas agendadas por data e horário.{" "}
          </CalendarTitle>
          <DatePicker inline />
        </Section>
      </Content>
    </Container>
  );
}
