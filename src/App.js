import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartingPage from "./pages/StartingPage";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard.tsx";
import SettingsPage from "./pages/SettingsPage";
import "./styles/App.css";
import React from "react";
import InterestModePage from "./pages/interestModePage";
import SavingsCalculator from "./components/interestPage/savingsCalculator";

function App() {
  return (
    <div className="vh-100 d-flex flex-column">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartingPage />} />
          <Route path="/game" element={<Dashboard />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="interestPage" element={<InterestModePage/>} />
          <Route path="settings" element={<SettingsPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
