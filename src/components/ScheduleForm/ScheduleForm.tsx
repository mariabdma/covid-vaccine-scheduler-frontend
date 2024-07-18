import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { ErrorText } from "./styles";
import "react-datepicker/dist/react-datepicker.css";
import { scheduleAppointment } from "../../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  birthDate: Yup.date().required("Data de nascimento é obrigatória"),
  scheduleDate: Yup.date().required("Data do agendamento é obrigatória"),
});

const initialValues = {
  name: "",
  birthDate: null,
  scheduleDate: null,
};

const ScheduleForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    console.log("Form values:", values); // Verifica os valores antes de enviar

    try {
      await scheduleAppointment(values);
      console.log("Appointment scheduled successfully"); // Verifica se o agendamento foi feito com sucesso
      alert("Agendamento realizado com sucesso!");
      resetForm();
      navigate("/"); // Navigate back to the homepage
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert("Ocorreu um erro ao realizar o agendamento.");
        }
      } else {
        alert("Ocorreu um erro desconhecido.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Nome:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component={ErrorText} />
          </div>

          <div>
            <label htmlFor="birthDate">Data de Nascimento:</label>
            <Field name="birthDate">
              {({ field, form, meta }: any) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => form.setFieldValue(field.name, date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecione a data"
                />
              )}
            </Field>
            <ErrorMessage name="birthDate" component={ErrorText} />
          </div>

          <div>
            <label htmlFor="scheduleDate">Data do Agendamento:</label>
            <Field name="scheduleDate">
              {({ field, form, meta }: any) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => form.setFieldValue(field.name, date)}
                  showTimeSelect
                  timeIntervals={60}
                  dateFormat="dd/MM/yyyy h:mm aa"
                  placeholderText="Selecione a data e hora"
                  minTime={new Date().setHours(8, 0)} // Sets minimum time to 8:00 AM today
                  maxTime={new Date().setHours(18, 0)} // Sets maximum time to 6:00 PM today
                />
              )}
            </Field>
            <ErrorMessage name="scheduleDate" component={ErrorText} />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Agendar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ScheduleForm;
