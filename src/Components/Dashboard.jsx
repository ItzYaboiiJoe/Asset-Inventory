import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  // State to store the count of documents for each collection
  const [totalComputers, setTotalComputers] = useState(0);
  const [totalMonitors, setTotalMonitors] = useState(0);
  const [totalServers, setTotalServers] = useState(0);
  const [totalSwitches, setTotalSwitches] = useState(0);
  const [totalIpads, setTotalIpads] = useState(0);

  // Fetch document counts for all collections on component mount
  useEffect(() => {
    const fetchCollectionCounts = async () => {
      // Fetching and counting documents for 'Computer' collection
      const computersSnapshot = await getDocs(collection(db, "Computer"));
      setTotalComputers(computersSnapshot.size); // size gives the total number of documents

      // Fetching and counting documents for 'Monitor' collection
      const monitorsSnapshot = await getDocs(collection(db, "Monitor"));
      setTotalMonitors(monitorsSnapshot.size);

      // Fetching and counting documents for 'Server' collection
      const serversSnapshot = await getDocs(collection(db, "Server"));
      setTotalServers(serversSnapshot.size);

      // Fetching and counting documents for 'Switches' collection
      const switchesSnapshot = await getDocs(collection(db, "Switches"));
      setTotalSwitches(switchesSnapshot.size);

      // Fetching and counting documents for 'iPads' collection
      const ipadsSnapshot = await getDocs(collection(db, "iPads"));
      setTotalIpads(ipadsSnapshot.size);
    };

    fetchCollectionCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div className="bg-teal-500 p-6 text-white rounded-lg">
        <h2 className="text-2xl font-bold">{totalComputers}</h2>
        <p className="text-sm uppercase">Total Computers</p>
        <Link to="/computers" className="mt-4 text-sm hover:underline">
          More Info
        </Link>
      </div>
      <div className="bg-red-500 p-6 text-white rounded-lg">
        <h2 className="text-2xl font-bold">{totalMonitors}</h2>
        <p className="text-sm uppercase">Total Monitors</p>
        <Link to="/monitors" className="mt-4 text-sm hover:underline">
          More Info
        </Link>
      </div>
      <div className="bg-blue-500 p-6 text-white rounded-lg">
        <h2 className="text-2xl font-bold">{totalServers}</h2>
        <p className="text-sm uppercase">Total Servers</p>
        <Link to="/servers" className="mt-4 text-sm hover:underline">
          More Info
        </Link>
      </div>
      <div className="bg-orange-500 p-6 text-white rounded-lg">
        <h2 className="text-2xl font-bold">{totalSwitches}</h2>
        <p className="text-sm uppercase">Total Switches</p>
        <Link to="/switches" className="mt-4 text-sm hover:underline">
          More Info
        </Link>
      </div>
      <div className="bg-purple-500 p-6 text-white rounded-lg">
        <h2 className="text-2xl font-bold">{totalIpads}</h2>
        <p className="text-sm uppercase">Total iPads</p>
        <Link to="/ipads" className="mt-4 text-sm hover:underline">
          More Info
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
