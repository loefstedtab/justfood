import React from "react";
import Navbar from "../components/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="mainBox">
      <AppRoutes />
      </div>

    </div>
  );
};

export default App;
