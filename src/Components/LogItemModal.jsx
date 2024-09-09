import React, { useState } from "react";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import AssetExistsModal from "./AssetExistsModal";

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
    const assetTag = e.target.assetTag.value;
    const location = e.target.location ? e.target.location.value : null;
    let data = {};

    if (selectedPage === "computers") {
      data.owner = e.target.owner.value;
    } else if (selectedPage === "monitors" || selectedPage === "gary") {
      data.model = e.target.model.value; // For Gary and monitors, store the model correctly
      data.serialNumber = e.target.serialNumber.value; // Ensure serialNumber is stored correctly
      data.type = e.target.type.value; // Store the type for Gary and monitors
    } else {
      data.serialNumber = e.target.serialNumber.value; // Store serialNumber for other categories
    }

    // Check if the asset exists in any collection
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

      // Only assign location if it's not Gary
      if (location) {
        data.currentLocation = location;
      }

      // Set checkOut date for Gary or non-DepartmentIT locations
      if (selectedPage === "gary" || location !== "DepartmentIT") {
        data.checkOut = new Date();
      } else {
        data.checkIn = new Date();
      }

      try {
        await setDoc(doc(db, collectionMap[selectedPage], assetTag), data);
        onSubmit({ assetTag, value: data.model, location, page: selectedPage });
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
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Log To Page
                </label>
                <Menu
                  as="div"
                  className="relative inline-block text-left w-full"
                >
                  <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                      {selectedPage.charAt(0).toUpperCase() +
                        selectedPage.slice(1)}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 h-5 w-5 text-gray-400"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedPage("computers")}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          Computers
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedPage("servers")}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          Servers
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedPage("monitors")}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          Monitors
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedPage("switches")}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          Switches
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedPage("ipads")}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          iPads
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedPage("gary")}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-left`}
                        >
                          Gary
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>

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

              {selectedPage === "computers" ? (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Owner
                  </label>
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
                  <label className="block text-sm font-medium mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    placeholder="Monitor Model"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              ) : selectedPage === "gary" ? (
                <>
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
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      placeholder="Model"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      placeholder="Type"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </>
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

              {/* Only show Location if selectedPage is NOT Gary */}
              {selectedPage !== "gary" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Branch/Department"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              )}

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
