import React, { useState } from "react";
import { format, parseISO, differenceInYears } from "date-fns";
import {
  AppointmentItem,
  AppointmentDetails,
  Modal,
  StatusText,
} from "./styles";

interface Appointment {
  id: number;
  name: string;
  birthDate: string;
  scheduleDate: string;
  scheduleTime: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusChange: (id: number, status: boolean) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onStatusChange,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<boolean>(() => {
    const storedStatus = localStorage.getItem(`appointment-${appointment.id}`);
    return storedStatus === "true";
  });

  const formatBirthDateAndCalculateAge = (birthDate: string) => {
    const birthDateParsed = parseISO(birthDate);
    const formattedBirthDate = format(birthDateParsed, "dd/MM/yyyy");
    const age = differenceInYears(new Date(), birthDateParsed);
    return `${formattedBirthDate} (Idade: ${age})`;
  };

  const handleStatusChange = (isCompleted: boolean) => {
    localStorage.setItem(`appointment-${appointment.id}`, String(isCompleted));
    setStatus(isCompleted);
    onStatusChange(appointment.id, isCompleted);
    setModalOpen(false);
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
        <StatusText status={status}>
          Status: {status ? "Agendamento Realizado" : "Agendamento Pendente"}
        </StatusText>
        <button onClick={() => setModalOpen(true)}>
          Marcar como Realizado
        </button>
        {isModalOpen && (
          <Modal>
            <h2>O agendamento foi realizado?</h2>
            <button onClick={() => handleStatusChange(true)}>Sim</button>
            <button onClick={() => handleStatusChange(false)}>Não</button>
            <button onClick={() => setModalOpen(false)}>Cancelar</button>
          </Modal>
        )}
      </AppointmentDetails>
    </AppointmentItem>
  );
};

export default AppointmentCard;
