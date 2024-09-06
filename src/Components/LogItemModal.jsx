import React, { useState } from "react";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

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

    if (selectedPage === "computers") {
      data.owner = value;
    } else if (selectedPage === "monitors") {
      data.model = value;
    } else {
      data.serialNumber = value;
    }

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
            <Menu as="div" className="relative inline-block text-left w-full">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                  {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}
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
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block px-4 py-2 text-sm w-full text-left`}
                    >
                      iPads
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
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
  );
};

export default LogItemModal;
