import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your actual back-end API URL
});

export const scheduleAppointment = async (appointmentData: any) => {
  try {
    const response = await api.post("/appointments", appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    throw error;
  }
};

export const getAppointments = async () => {
  try {
    const response = await api.get("/appointments");
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};
