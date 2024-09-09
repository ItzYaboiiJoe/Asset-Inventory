import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import RecentActivity from "./Components/RecentActivity";
import PieChart from "./Components/PieChart";
import WeeklyGaryLogsChart from "./Components/WeeklyGaryLogsChart";
import { listenToCollectionCounts } from "./Components/listenToCollectionCounts";
import ComputersPage from "./Pages/ComputersPage";
import ServersPage from "./Pages/ServersPage";
import MonitorsPage from "./Pages/MonitorsPage";
import SwitchesPage from "./Pages/SwitchesPage";
import IpadsPage from "./Pages/IpadsPage";
import GaryPage from "./Pages/GaryPage";

function App() {
  const [data, setData] = useState([0, 0, 0, 0, 0]);
  const [totalAssets, setTotalAssets] = useState(0);

  useEffect(() => {
    const unsubscribe = listenToCollectionCounts((assetCounts, totalAssets) => {
      setData(assetCounts);
      setTotalAssets(totalAssets);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200">
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
                  <div className="flex justify-between">
                    <div className="w-1/2">
                      <PieChart data={data} totalAssets={totalAssets} />
                    </div>
                    <div className="w-1/2">
                      <WeeklyGaryLogsChart />
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/computers" element={<ComputersPage />} />
            <Route path="/servers" element={<ServersPage />} />
            <Route path="/monitors" element={<MonitorsPage />} />
            <Route path="/switches" element={<SwitchesPage />} />
            <Route path="/ipads" element={<IpadsPage />} />
            <Route path="/gary" element={<GaryPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
