import React from "react";
import { Container, SchedulerTitle } from "./styles";
import ScheduleForm from "../../components/ScheduleForm";

export default function SchedulePage(): JSX.Element {
  return (
    <Container>
      <SchedulerTitle> Preencha os dados para agendamento: </SchedulerTitle>
      <ScheduleForm></ScheduleForm>
    </Container>
  );
}
