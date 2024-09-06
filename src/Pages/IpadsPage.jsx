import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const IpadsPage = () => {
  const navigate = useNavigate();
  const [ipadsData, setIpadsData] = useState([]);

  useEffect(() => {
    const fetchIpadsData = async () => {
      const querySnapshot = await getDocs(collection(db, "iPads"));
      const ipads = querySnapshot.docs.map((doc) => ({
        AssetTag: doc.id,
        serialNumber: doc.data().serialNumber,
        location: doc.data().currentLocation,
        checkInDate: doc.data().checkIn ? doc.data().checkIn.toDate() : null,
        checkOutDate: doc.data().checkOut ? doc.data().checkOut.toDate() : null,
      }));
      setIpadsData(ipads);
    };

    fetchIpadsData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">iPads</h2>
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
            <th className="px-4 py-2">Check Date</th>
          </tr>
        </thead>
        <tbody>
          {ipadsData.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No iPads available.
              </td>
            </tr>
          ) : (
            ipadsData.map((item, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-4 py-2">{item.AssetTag}</td>
                <td className="px-4 py-2">{item.serialNumber}</td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">
                  {item.location === "DepartmentIT"
                    ? item.checkInDate
                      ? `Checked In: ${item.checkInDate.toLocaleDateString()}`
                      : "N/A"
                    : item.checkOutDate
                    ? `Checked Out: ${item.checkOutDate.toLocaleDateString()}`
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

export default IpadsPage;
