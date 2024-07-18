import React from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Popup from "./components/Popup";

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <Popup />
    </div>
  );
}

export default App;
