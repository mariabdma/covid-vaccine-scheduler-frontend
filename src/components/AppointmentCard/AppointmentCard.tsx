import React from "react";
import { format, parseISO, differenceInYears } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AppointmentItem, AppointmentDetails } from "./styles";

interface Appointment {
  id: number;
  name: string;
  birthDate: string;
  scheduleDate: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const formatBirthDateAndCalculateAge = (birthDate: string) => {
    const birthDateParsed = parseISO(birthDate);
    const formattedBirthDate = format(birthDateParsed, "dd/MM/yyyy");
    const age = differenceInYears(new Date(), birthDateParsed);
    return `${formattedBirthDate} (Idade: ${age})`;
  };

  return (
    <AppointmentItem>
      <AppointmentDetails>
        <div>
          <strong>Nome:</strong> {appointment.name}
        </div>
        <div>
          <strong>Data de Nascimento:</strong>{" "}
          {formatBirthDateAndCalculateAge(appointment.birthDate)}
        </div>
      </AppointmentDetails>
    </AppointmentItem>
  );
};

export default AppointmentCard;
