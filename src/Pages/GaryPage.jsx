import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const GaryPage = () => {
  const navigate = useNavigate();
  const [garyData, setGaryData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Gary"), (snapshot) => {
      const assets = snapshot.docs.map((doc) => ({
        AssetTag: doc.id,
        serialNumber: doc.data().serialNumber,
        model: doc.data().model,
        type: doc.data().type,
        checkOut: doc.data().checkOut ? doc.data().checkOut.toDate() : null,
      }));
      setGaryData(assets);
    });

    return () => unsubscribe();
  }, []);

  // Function to convert data to CSV and download it
  const exportToCSV = () => {
    const headers = [
      "Asset Tag",
      "Serial Number",
      "Model",
      "Type",
      "Check Date",
    ];
    const rows = garyData.map((item) => [
      item.AssetTag,
      item.serialNumber,
      item.model,
      item.type,
      item.checkOut ? item.checkOut.toLocaleDateString() : "N/A",
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(","), // Add headers
      ...rows.map((row) => row.join(",")), // Add rows
    ].join("\n");

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "gary_assets.csv"); // Set download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gary</h2>

      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Back
        </button>

        {/* Export to CSV button*/}
        <button
          onClick={exportToCSV}
          className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Export to CSV
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-3">Asset Tag</th>
            <th className="px-4 py-3">Serial Number</th>
            <th className="px-4 py-3">Model</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Check Date</th>
          </tr>
        </thead>
        <tbody>
          {garyData.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No assets available.
              </td>
            </tr>
          ) : (
            garyData.map((item, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-4 py-2">{item.AssetTag}</td>
                <td className="px-4 py-2">{item.serialNumber}</td>
                <td className="px-4 py-2">{item.model}</td>
                <td className="px-4 py-2">{item.type}</td>
                <td className="px-4 py-2">
                  {item.checkOut ? item.checkOut.toLocaleDateString() : "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GaryPage;
