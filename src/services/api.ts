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

export const fetchAvailableHours = async (date: Date) => {
  try {
    const response = await api.get("/appointments/available-hours", {
      params: {
        date: date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      },
    });
    return response.data; // Assuming the response.data is an array of available hours
  } catch (error) {
    console.error("Error fetching available hours:", error);
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
