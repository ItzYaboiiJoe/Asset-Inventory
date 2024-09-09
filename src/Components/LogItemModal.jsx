import React, { useState } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import DropdownMenu from "../Forms/DropdownMenn";
import AssetExistsModal from "./AssetExistsModal";
import ComputersFields from "../Forms/ComputerFields";
import MonitorsFields from "../Forms/MonitorFields";
import GaryFields from "../Forms/GaryFields";
import OtherFields from "../Forms/OtherFields";
import LocationField from "../Forms/LocationField";

const LogItemModal = ({ isOpen, onClose, onSubmit }) => {
  const [selectedPage, setSelectedPage] = useState("computers");
  const [assetExists, setAssetExists] = useState(false);
  const [existingAsset, setExistingAsset] = useState(null);

  // Ensure modals aren't rendered at the same time
  if (!isOpen && !assetExists) return null;

  const checkAssetInAllCollections = async (assetTag) => {
    const collectionsToCheck = [
      "Computer",
      "Monitor",
      "Server",
      "Switches",
      "iPads",
      "Gary",
    ];
    let assetData = null;

    for (const collectionName of collectionsToCheck) {
      const assetDocRef = doc(db, collectionName, assetTag);
      const assetDocSnap = await getDoc(assetDocRef);

      if (assetDocSnap.exists()) {
        const existingData = assetDocSnap.data();
        assetData = {
          AssetTag: assetTag,
          value:
            collectionName === "Computer"
              ? existingData.owner
              : collectionName === "Monitor"
              ? existingData.model
              : existingData.serialNumber,
          location: existingData.currentLocation,
          collection: collectionName,
        };
        break;
      }
    }
    return assetData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assetTag = e.target.assetTag?.value;
    const location = e.target.location ? e.target.location.value : null;
    let data = {};

    // Check for computers
    if (selectedPage === "computers") {
      data.owner = e.target.owner?.value;
    }
    // Check for monitors (only model is needed here)
    else if (selectedPage === "monitors") {
      const model = e.target.model?.value;
      if (!model) {
        console.error("Model is missing!");
        return;
      }
      data.model = model;
    }
    // Check for gary (needs model, serialNumber, and type)
    else if (selectedPage === "gary") {
      const model = e.target.model?.value;
      const serialNumber = e.target.serialNumber?.value;
      const type = e.target.type?.value;

      if (!model || !serialNumber || !type) {
        console.error("Model, Serial Number, or Type is missing!");
        return;
      }

      data.model = model;
      data.serialNumber = serialNumber;
      data.type = type;
    }
    // For all other categories that need serialNumber
    else {
      const serialNumber = e.target.serialNumber?.value;
      if (!serialNumber) {
        console.error("Serial Number is missing!");
        return;
      }
      data.serialNumber = serialNumber;
    }

    const existingAssetData = await checkAssetInAllCollections(assetTag);

    if (existingAssetData) {
      onClose();
      setTimeout(() => {
        setExistingAsset(existingAssetData);
        setAssetExists(true);
      }, 300);
    } else {
      const collectionMap = {
        computers: "Computer",
        servers: "Server",
        monitors: "Monitor",
        switches: "Switches",
        ipads: "iPads",
        gary: "Gary",
      };

      if (location) {
        data.currentLocation = location;
      }

      if (selectedPage === "gary" || location !== "DepartmentIT") {
        data.checkOut = new Date();
      } else {
        data.checkIn = new Date();
      }

      try {
        await setDoc(doc(db, collectionMap[selectedPage], assetTag), data);
        onSubmit({
          assetTag,
          value: data.model || data.owner,
          location,
          page: selectedPage,
        });
        onClose();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <>
      {isOpen && !assetExists && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50 "></div>
          <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-lg z-50">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Log New Item
            </h2>
            <form onSubmit={handleSubmit}>
              <DropdownMenu
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Asset Tag
                </label>
                <input
                  type="text"
                  name="assetTag"
                  placeholder="Asset Tag"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {selectedPage === "computers" && <ComputersFields />}
              {selectedPage === "monitors" && <MonitorsFields />}
              {selectedPage === "gary" && <GaryFields />}
              {selectedPage !== "gary" && <LocationField />}
              {selectedPage !== "computers" &&
                selectedPage !== "monitors" &&
                selectedPage !== "gary" && <OtherFields />}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mr-2 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {assetExists && (
        <AssetExistsModal
          isOpen={assetExists}
          onClose={() => setAssetExists(false)}
          existingAsset={existingAsset}
        />
      )}
    </>
  );
};

export default LogItemModal;
