import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { scheduleAppointment, fetchAvailableHours } from "../../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorText } from "./styles";
import { BirthDatePicker } from "../"; // Updated import to match file name
import { usePopup } from "../../contexts/PopupContext";

const today = new Date();
today.setHours(0, 0, 0, 0);

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Nome é obrigatório")
    .min(5, "Nome muito curto, utilize mais de 5 caracteres")
    .matches(/^[a-zA-Z ]+$/, "Uso de caracteres não permitidos"),
  birthDate: Yup.date()
    .required("Data de nascimento é obrigatória")
    .max(today, "Data de nascimento inválida"),
  scheduleDate: Yup.date()
    .required("Data do agendamento é obrigatória")
    .min(today, "Data de agendamento inválida"),
  scheduleTime: Yup.string().required("Horário do agendamento é obrigatório"),
});

const initialValues = {
  name: "",
  birthDate: null,
  scheduleDate: null,
  scheduleTime: "",
};

const ScheduleForm: React.FC = () => {
  const { showPopup } = usePopup();
  const navigate = useNavigate();
  const [availableHours, setAvailableHours] = useState<
    { hour: string; count: number }[]
  >([]);
  const [loadingHours, setLoadingHours] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    values.birthDate = values.birthDate ? new Date(values.birthDate) : null;
    values.scheduleDate = values.scheduleDate
      ? new Date(values.scheduleDate).toISOString().split("T")[0]
      : null;

    console.log("Form values:", values);

    try {
      await scheduleAppointment(values);
      console.log("Appointment scheduled successfully");
      showPopup(
        <div>
          <h2>Sucesso!</h2>
          <p>Agendamento realizado com sucesso!</p>
          <button onClick={() => navigate("/")}>
            Voltar para a página inicial
          </button>
          <button onClick={() => navigate("/schedule")}>
            Realizar outro agendamento
          </button>
        </div>
      );
      resetForm();
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      if (axios.isAxiosError(error)) {
        showPopup(
          <div>
            <h2>Erro!</h2>
            <p>
              {error.response?.data?.message ||
                "Ocorreu um erro ao realizar o agendamento."}
            </p>
          </div>
        );
      } else {
        showPopup(
          <div>
            <h2>Erro!</h2>
            <p>Ocorreu um erro desconhecido.</p>
          </div>
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchHours = async (date: Date | null) => {
      if (date) {
        setLoadingHours(true);
        try {
          const hours = await fetchAvailableHours(date);
          setAvailableHours(hours);
        } catch (error) {
          console.error("Error fetching available hours:", error);
          showPopup(
            <div>
              <h2>Erro!</h2>
              <p>Ocorreu um erro ao buscar os horários disponíveis.</p>
            </div>
          );
        } finally {
          setLoadingHours(false);
        }
      }
    };

    fetchHours(selectedDate);
  }, [selectedDate]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, isValid, values, resetForm }) => (
        <Form>
          <div>
            <label htmlFor="name">Nome:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component={ErrorText} />
          </div>

          <div>
            <BirthDatePicker
              value={values.birthDate}
              onChange={(date: Date | null) => setFieldValue("birthDate", date)}
            />
            <ErrorMessage name="birthDate" component={ErrorText} />
          </div>

          <div>
            <label htmlFor="scheduleDate">Data do Agendamento:</label>
            <Field name="scheduleDate">
              {({ field, form }: any) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => {
                    form.setFieldValue(field.name, date);
                    setSelectedDate(date); // Update selectedDate state
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecione a data"
                  minDate={today}
                />
              )}
            </Field>
            <ErrorMessage name="scheduleDate" component={ErrorText} />
          </div>

          {values.scheduleDate && (
            <div>
              <label htmlFor="scheduleTime">Hora do Agendamento:</label>
              <Field as="select" name="scheduleTime">
                <option value="">Selecione um horário</option>
                {availableHours
                  .filter(({ count }) => count < 2) // Only include available hours
                  .map(({ hour }) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
              </Field>
              <ErrorMessage name="scheduleTime" component={ErrorText} />
            </div>
          )}

          <button
            type="submit"
            disabled={
              isSubmitting || !isValid || !values.scheduleTime || loadingHours
            }
          >
            {isSubmitting ? "Aguarde..." : "Agendar"}
          </button>
          {loadingHours && <p>Carregando horários disponíveis...</p>}
        </Form>
      )}
    </Formik>
  );
};

export default ScheduleForm;
