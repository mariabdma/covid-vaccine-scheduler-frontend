import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { scheduleAppointment, fetchAvailableHours } from "../../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorText, FormField, StyledButton } from "./styles";
import { BirthDatePicker } from "../";
import { usePopup } from "../../contexts/PopupContext";

const today = new Date();
today.setHours(0, 0, 0, 0);

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Nome é obrigatório")
    .min(5, "Nome muito curto, utilize mais de 5 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Uso de caracteres não permitidos"),
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
  birthDate: null as Date | null,
  scheduleDate: null as Date | null,
  scheduleTime: "",
};

type FormValues = typeof initialValues;

const ScheduleForm: React.FC = () => {
  const { showPopup } = usePopup();
  const navigate = useNavigate();
  const [availableHours, setAvailableHours] = useState<
    { hour: string; count: number }[]
  >([]);
  const [loadingHours, setLoadingHours] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const saveFormData = (formData: FormValues) => {
    localStorage.setItem(
      "formData",
      JSON.stringify({
        ...formData,
        birthDate: formData.birthDate ? formData.birthDate.toISOString() : null,
        scheduleDate: formData.scheduleDate
          ? formData.scheduleDate.toISOString()
          : null,
      })
    );
  };

  const loadFormData = (): FormValues => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      return {
        ...parsedData,
        birthDate: parsedData.birthDate ? new Date(parsedData.birthDate) : null,
        scheduleDate: parsedData.scheduleDate
          ? new Date(parsedData.scheduleDate)
          : null,
      };
    }
    return initialValues;
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    const formattedValues = {
      ...values,
      birthDate: values.birthDate ? new Date(values.birthDate) : null,
      scheduleDate: values.scheduleDate
        ? new Date(values.scheduleDate).toISOString().split("T")[0]
        : null,
    };

    console.log("Form values:", formattedValues);

    try {
      const response = await scheduleAppointment(formattedValues);
      console.log("Appointment scheduled successfully");
      showPopup(
        <div>
          <h2>Sucesso!</h2>
          <p>Agendamento realizado com sucesso!</p>
          <button onClick={() => navigate("/")}>
            Voltar para a página inicial
          </button>
        </div>
      );
      resetForm();
      localStorage.removeItem("formData");
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

  const fetchHours = useCallback(
    async (date: Date | null) => {
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
    },
    [showPopup]
  );

  useEffect(() => {
    fetchHours(selectedDate);
  }, [selectedDate, fetchHours]);

  return (
    <Formik
      initialValues={loadFormData()}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, isValid, values }) => (
        <Form>
          <FormField>
            <label htmlFor="name">Nome:</label>
            <Field
              type="text"
              id="name"
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue("name", e.target.value);
                saveFormData({ ...values, name: e.target.value });
              }}
              value={values.name}
            />
            <ErrorMessage name="name" component={ErrorText} />
          </FormField>

          <FormField>
            <BirthDatePicker
              value={values.birthDate}
              onChange={(date: Date | null) => {
                setFieldValue("birthDate", date);
                saveFormData({ ...values, birthDate: date });
              }}
            />
            <ErrorMessage name="birthDate" component={ErrorText} />
          </FormField>

          <FormField>
            <label htmlFor="scheduleDate">Data do Agendamento:</label>
            <Field name="scheduleDate">
              {({ field, form }: any) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => {
                    form.setFieldValue(field.name, date);
                    setSelectedDate(date);
                    saveFormData({ ...values, scheduleDate: date });
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecione a data"
                  minDate={today}
                />
              )}
            </Field>
            <ErrorMessage name="scheduleDate" component={ErrorText} />
          </FormField>

          {values.scheduleDate && (
            <FormField>
              <label htmlFor="scheduleTime">Hora do Agendamento:</label>
              <Field
                as="select"
                name="scheduleTime"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setFieldValue("scheduleTime", e.target.value);
                  saveFormData({ ...values, scheduleTime: e.target.value });
                }}
                value={values.scheduleTime}
              >
                <option value="">Selecione um horário</option>
                {availableHours
                  .filter(({ count }) => count < 2)
                  .map(({ hour }) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
              </Field>
              <ErrorMessage name="scheduleTime" component={ErrorText} />
            </FormField>
          )}

          <StyledButton
            type="submit"
            disabled={
              isSubmitting || !isValid || !values.scheduleTime || loadingHours
            }
          >
            {isSubmitting ? "Aguarde..." : "Agendar"}
          </StyledButton>
          {loadingHours && <p>Carregando horários disponíveis...</p>}
        </Form>
      )}
    </Formik>
  );
};

export default ScheduleForm;
