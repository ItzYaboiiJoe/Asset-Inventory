import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const ComputersPage = () => {
  const navigate = useNavigate();
  const [computersData, setComputersData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Computer"), (snapshot) => {
      const computers = snapshot.docs.map((doc) => ({
        AssetTag: doc.id,
        owner: doc.data().owner,
        location: doc.data().currentLocation,
        CheckOutDate: doc.data().checkOut ? doc.data().checkOut.toDate() : null,
        CheckInDate: doc.data().checkIn ? doc.data().checkIn.toDate() : null,
      }));
      setComputersData(computers);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Computers</h2>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-4 transition-colors"
      >
        Back
      </button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-3">Asset Tag</th>
            <th className="px-4 py-3">Owner</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Check Date</th>
          </tr>
        </thead>
        <tbody>
          {computersData.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No computers available.
              </td>
            </tr>
          ) : (
            computersData.map((item, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-4 py-2">{item.AssetTag}</td>
                <td className="px-4 py-2">{item.owner}</td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">
                  {item.location === "DepartmentIT" ? (
                    <>
                      <span>Checked In</span>
                      <br />
                      {item.CheckInDate
                        ? item.CheckInDate.toLocaleDateString()
                        : "N/A"}
                    </>
                  ) : (
                    <>
                      <span>Checked Out</span>
                      <br />
                      {item.CheckOutDate
                        ? item.CheckOutDate.toLocaleDateString()
                        : "N/A"}
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ComputersPage;
