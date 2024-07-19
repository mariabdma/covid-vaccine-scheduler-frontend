import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Homepage, SchedulePage, AppointmentsPage } from "../pages";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
