import React, { useState } from "react";
import { setDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import DropdownMenu from "../Forms/DropdownMenn";
import ComputersFields from "../Forms/ComputerFields";
import MonitorsFields from "../Forms/MonitorFields";
import GaryFields from "../Forms/GaryFields";
import OtherFields from "../Forms/OtherFields";
import LocationField from "../Forms/LocationField";
import ConfirmationModal from "./ConfirmationModal";
import { checkAssetInAllCollections } from "./checkAssetHelper";
import { handleModalClose } from "./modalHelper";

const LogItemModal = ({ isOpen, onClose, onSubmit }) => {
  const [selectedPage, setSelectedPage] = useState("computers");
  const [assetExists, setAssetExists] = useState(false);
  const [existingAsset, setExistingAsset] = useState(null);
  const [showGaryFields, setShowGaryFields] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assetTag = e.target.assetTag?.value;
    const location = e.target.location ? e.target.location.value : null;
    let data = {};

    // First step: search for asset tag when "gary" is selected
    if (selectedPage === "gary" && !showGaryFields) {
      const { assetData, foundInCollection } = await checkAssetInAllCollections(
        assetTag
      );

      if (assetData) {
        setExistingAsset(assetData);
        setShowConfirmation(true); // Show the confirmation modal
        return;
      } else {
        // If the asset tag does not exist, show GaryFields
        setShowGaryFields(true);
        return; // Stop further execution until GaryFields is shown
      }
    }

    // After showing GaryFields, the second submit captures additional Gary data
    if (selectedPage === "gary" && showGaryFields) {
      const model = e.target.model?.value;
      const serialNumber = e.target.serialNumber?.value;
      const type = e.target.type?.value;

      if (!model || !serialNumber || !type) {
        console.error("Model, Serial Number, or Type is missing!");
        return;
      }

      // Prepare data for Gary collection
      data.model = model;
      data.serialNumber = serialNumber;
      data.type = type;

      if (location) {
        data.currentLocation = location;
      }
      data.checkOut = new Date(); // Add checkout time for Gary assets

      try {
        // Save to the Gary collection
        await setDoc(doc(db, "Gary", assetTag), data);

        onSubmit({
          assetTag,
          value: data.model,
          location,
          page: selectedPage,
        });

        // Close modal after successful submission
        handleModalClose(
          onClose,
          setShowGaryFields,
          setAssetExists,
          setShowConfirmation
        );
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      return;
    }

    // Handle other categories like computers, monitors, etc.
    if (selectedPage === "computers") {
      data.owner = e.target.owner?.value;
    } else if (selectedPage === "monitors") {
      const model = e.target.model?.value;
      if (!model) {
        console.error("Model is missing!");
        return;
      }
      data.model = model;
    } else {
      const serialNumber = e.target.serialNumber?.value;
      if (!serialNumber) {
        console.error("Serial Number is missing!");
        return;
      }
      data.serialNumber = serialNumber;
    }

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
      handleModalClose(
        onClose,
        setShowGaryFields,
        setAssetExists,
        setShowConfirmation
      );
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleConfirmMove = () => {
    // Show the Gary fields after confirming the move but before deleting the asset
    setShowGaryFields(true);
    setShowConfirmation(false); // Close the confirmation modal
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
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

              {/* Show Gary Fields after checking asset tag */}
              {selectedPage === "gary" && showGaryFields && <GaryFields />}

              {/* Render fields for other categories */}
              {selectedPage === "computers" && <ComputersFields />}
              {selectedPage === "monitors" && <MonitorsFields />}
              {selectedPage !== "gary" && <LocationField />}
              {selectedPage !== "computers" &&
                selectedPage !== "monitors" &&
                selectedPage !== "gary" && <OtherFields />}

              <div className="flex justify-end">
                {/* If Gary Fields are being shown, the user can't cancel */}
                {!showGaryFields && (
                  <button
                    type="button"
                    onClick={() =>
                      handleModalClose(
                        onClose,
                        setShowGaryFields,
                        setAssetExists,
                        setShowConfirmation
                      )
                    } // Call the helper
                    className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mr-2 transition"
                  >
                    Cancel
                  </button>
                )}
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

      {/* Display confirmation modal for moving asset */}
      {showConfirmation && (
        <ConfirmationModal
          isOpen={showConfirmation}
          onConfirm={handleConfirmMove}
          onCancel={() =>
            handleModalClose(
              onClose,
              setShowGaryFields,
              setAssetExists,
              setShowConfirmation
            )
          } // Call the helper
          assetData={existingAsset} // Pass the existing asset data to the confirmation modal
        />
      )}
    </>
  );
};

export default LogItemModal;
