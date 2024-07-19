import React from "react";
import { HomeButton } from "../../components";
import {
  Container,
  Header,
  Title,
  Content,
  ScheduleSection,
  AppointmentSection,
  Icon,
  DescriptionBox,
} from "./styles";
import { FaSyringe } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

export default function Homepage(): JSX.Element {
  return (
    <Container>
      <Header>
        <Icon>
          <FaSyringe />
        </Icon>
        <Title>Portal de Vacinação COVID-19</Title>
      </Header>
      <DescriptionBox>
        {" "}
        <p>
          Facilitamos o agendamento da sua vacinação de forma rápida e segura.
          Marque seu horário e ajude a construir um futuro mais saudável.
        </p>
      </DescriptionBox>
      <Content>
        <ScheduleSection>
          <HomeButton to="/schedule" bgColor="#071a3b" textColor="#FFFFFF">
            Realize um agendamento.
            <GoArrowUpRight />
          </HomeButton>
        </ScheduleSection>
        <AppointmentSection>
          <HomeButton to="/appointments" bgColor="#ff1e1e0" textColor="#071a3b">
            Consulte agendamentos.
            <GoArrowUpRight />
          </HomeButton>
        </AppointmentSection>
      </Content>
    </Container>
  );
}
