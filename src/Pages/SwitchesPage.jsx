import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const SwitchesPage = () => {
  const navigate = useNavigate();
  const [switchesData, setSwitchesData] = useState([]);

  useEffect(() => {
    const fetchSwitchesData = async () => {
      const querySnapshot = await getDocs(collection(db, "Switches"));
      const switches = querySnapshot.docs.map((doc) => ({
        AssetTag: doc.id,
        serialNumber: doc.data().serialNumber,
        location: doc.data().currentLocation,
        CheckOutDate: doc.data().checkOut ? doc.data().checkOut.toDate() : null,
      }));
      setSwitchesData(switches);
    };

    fetchSwitchesData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Switches</h2>
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
            <th className="px-4 py-2">Last Check In</th>
          </tr>
        </thead>
        <tbody>
          {switchesData.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No switches available.
              </td>
            </tr>
          ) : (
            switchesData.map((item, index) => (
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

export default SwitchesPage;
