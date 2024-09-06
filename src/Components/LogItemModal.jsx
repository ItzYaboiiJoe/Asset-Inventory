import React, { useState } from "react";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const LogItemModal = ({ isOpen, onClose, onSubmit }) => {
  const [selectedPage, setSelectedPage] = useState("computers");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const assetTag = e.target.assetTag.value;
    const location = e.target.location.value;
    let value;

    if (selectedPage === "computers") {
      value = e.target.owner.value;
    } else if (selectedPage === "monitors") {
      value = e.target.model.value;
    } else {
      value = e.target.serialNumber.value;
    }

    const collectionMap = {
      computers: "Computer",
      servers: "Server",
      monitors: "Monitor",
      switches: "Switches",
      ipads: "iPads",
    };

    const data = {
      currentLocation: location,
    };

    // Set the appropriate field for each case
    if (selectedPage === "computers") {
      data.owner = value;
    } else if (selectedPage === "monitors") {
      data.model = value;
    } else {
      data.serialNumber = value;
    }

    // Add check-in or check-out based on location
    if (location === "DepartmentIT") {
      data.checkIn = new Date();
    } else {
      data.checkOut = new Date();
    }

    try {
      await setDoc(doc(db, collectionMap[selectedPage], assetTag), data);
      onSubmit({ assetTag, value, location, page: selectedPage });
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Log New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Log To Page
            </label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="computers">Computers</option>
              <option value="servers">Servers</option>
              <option value="monitors">Monitors</option>
              <option value="switches">Switches</option>
              <option value="ipads">iPads</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Asset Tag</label>
            <input
              type="text"
              name="assetTag"
              placeholder="Asset Tag"
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {selectedPage === "computers" ? (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Owner</label>
              <input
                type="text"
                name="owner"
                placeholder="Owner Name"
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          ) : selectedPage === "monitors" ? (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Model</label>
              <input
                type="text"
                name="model"
                placeholder="Monitor Model"
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Serial Number
              </label>
              <input
                type="text"
                name="serialNumber"
                placeholder="Serial Number"
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Branch/Department"
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogItemModal;
