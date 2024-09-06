import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ServersPage = () => {
  const navigate = useNavigate();
  const [serversData, setServersData] = useState([]);

  useEffect(() => {
    const fetchServersData = async () => {
      const querySnapshot = await getDocs(collection(db, "Server"));
      const servers = querySnapshot.docs.map((doc) => ({
        AssetTag: doc.id,
        serialNumber: doc.data().serialNumber,
        location: doc.data().currentLocation,
        CheckOutDate: doc.data().checkOut ? doc.data().checkOut.toDate() : null,
      }));
      setServersData(servers);
    };

    fetchServersData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Servers</h2>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-4 transition-colors"
      >
        Back
      </button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2">Asset Tag</th>
            <th className="px-4 py-2">Serial Number</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Check Out Date</th>
          </tr>
        </thead>
        <tbody>
          {serversData.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No servers available.
              </td>
            </tr>
          ) : (
            serversData.map((item, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-4 py-2">{item.AssetTag}</td>
                <td className="px-4 py-2">{item.serialNumber}</td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">
                  {item.CheckOutDate
                    ? item.CheckOutDate.toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServersPage;
