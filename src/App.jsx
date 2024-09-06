import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./Components/Dashboard";
import RecentActivity from "./Components/RecentActivity";
import ComputersPage from "./pages/ComputersPage";
import ServersPage from "./pages/ServersPage";
import MonitorsPage from "./pages/MonitorsPage";
import SwitchesPage from "./pages/SwitchesPage";
import IpadsPage from "./pages/IpadsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Dashboard />
                <RecentActivity />
              </div>
            }
          />
          <Route path="/computers" element={<ComputersPage />} />
          <Route path="/servers" element={<ServersPage />} />
          <Route path="/monitors" element={<MonitorsPage />} />
          <Route path="/switches" element={<SwitchesPage />} />
          <Route path="/ipads" element={<IpadsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
