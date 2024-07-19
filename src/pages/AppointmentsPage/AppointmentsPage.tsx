import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Container,
  Header,
  Content,
  Title,
  AppointmentList,
  AppointmentDateGroup,
  AppointmentTimeGroup,
  SearchBar,
} from "./styles";
import { getAppointments } from "../../services/api";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AppointmentCard } from "../../components";

interface Appointment {
  id: number;
  name: string;
  birthDate: string;
  scheduleDate: string;
  scheduleTime: string;
  completed?: boolean;
}

interface GroupedAppointments {
  [key: string]: {
    [key: string]: {
      [key: string]: Appointment[];
    };
  };
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        const sortedAppointments = data.sort(
          (a: Appointment, b: Appointment) => {
            const aDateTime = new Date(
              `${a.scheduleDate}T${a.scheduleTime}`
            ).getTime();
            const bDateTime = new Date(
              `${b.scheduleDate}T${b.scheduleTime}`
            ).getTime();
            return aDateTime - bDateTime;
          }
        );
        setAppointments(sortedAppointments);
      } catch (err) {
        setError("Falha ao buscar agendamentos");
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = (id: number, status: boolean) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, completed: status }
          : appointment
      )
    );
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const groupAppointmentsByDateAndTime = (): GroupedAppointments => {
    const filteredAppointments = appointments.filter((appointment) =>
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredAppointments.reduce(
      (acc: GroupedAppointments, appointment) => {
        const date = capitalizeFirstLetter(
          format(parseISO(appointment.scheduleDate), "MMMM", {
            locale: ptBR,
          })
        );
        const day = capitalizeFirstLetter(
          format(parseISO(appointment.scheduleDate), "EEEE, d 'de' MMMM", {
            locale: ptBR,
          })
        );
        const appointmentDateTime = new Date(
          `${appointment.scheduleDate}T${appointment.scheduleTime}`
        );
        const time = format(appointmentDateTime, "HH:mm");

        if (!acc[date]) {
          acc[date] = {};
        }

        if (!acc[date][day]) {
          acc[date][day] = {};
        }

        if (!acc[date][day][time]) {
          acc[date][day][time] = [];
        }

        acc[date][day][time].push(appointment);
        return acc;
      },
      {}
    );
  };

  const groupedAppointments = groupAppointmentsByDateAndTime();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Header>
        <Title>Agendamentos para vacinação de Covid 19</Title>
      </Header>
      <Content>
        <SearchBar
          type="text"
          placeholder="Buscar por nome"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {Object.entries(groupedAppointments).map(([month, days]) => (
          <React.Fragment key={month}>
            <h2>{month}</h2>
            {Object.entries(days).map(([day, times]) => (
              <AppointmentDateGroup key={day}>
                <h3>{day}</h3>
                {Object.entries(times).map(([time, appointmentsAtTime]) => (
                  <AppointmentTimeGroup key={time}>
                    <div>
                      <h4>{time}</h4>
                    </div>
                    <AppointmentList>
                      {appointmentsAtTime.map((appointment: Appointment) => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </AppointmentList>
                  </AppointmentTimeGroup>
                ))}
              </AppointmentDateGroup>
            ))}
          </React.Fragment>
        ))}
      </Content>
    </Container>
  );
};

export default AppointmentsPage;
