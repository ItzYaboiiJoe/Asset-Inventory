import React, { useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import LogItemModal from "./LogItemModal";
import SearchResultModal from "./SearchResultModal";
import NotFoundModal from "./NotFoundModal";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotFoundOpen, setIsNotFoundOpen] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const collections = ["Computer", "Monitor", "Server", "Switches", "iPads"];

  const handleSearchInput = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setSearchInput(value);
    }
  };

  const handleSearch = async () => {
    let foundItem = null;

    for (const collectionName of collections) {
      const docRef = doc(db, collectionName, searchInput);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();

        const checkInDate = docData.checkIn ? docData.checkIn.toDate() : null;
        const checkOutDate = docData.checkOut
          ? docData.checkOut.toDate()
          : null;
        const latestDate =
          checkInDate > checkOutDate ? checkInDate : checkOutDate;

        foundItem = {
          AssetTag: docSnap.id,
          value:
            collectionName === "Computer"
              ? docData.owner || "N/A"
              : collectionName === "Monitor"
              ? docData.model || "N/A"
              : docData.serialNumber || "N/A",
          location: docData.currentLocation || "N/A",
          checkDate: latestDate ? latestDate.toLocaleString() : "N/A",
          checkType: checkInDate > checkOutDate ? "Checked In" : "Checked Out",
          collection: collectionName,
        };
        break;
      }
    }

    if (foundItem) {
      setSearchResult(foundItem);
      setIsSearchModalOpen(true);
    } else {
      setIsNotFoundOpen(true);
    }
  };

  const handleLogItemSubmit = (data) => {
    console.log("Logged Item Data:", data);
    setIsLogModalOpen(false);
  };

  const handleCloseLogModal = () => {
    setIsLogModalOpen(false);
  };

  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  const handleCloseNotFoundModal = () => {
    setIsNotFoundOpen(false);
  };

  return (
    <>
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">IT Asset Management</h1>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="bg-white text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-200"
          >
            Log Item
          </button>
        </div>

        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Lookup by Asset Tag"
            value={searchInput}
            onChange={handleSearchInput}
            className="p-2 rounded-lg text-black bg-white placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            className="bg-white text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-200"
          >
            Search
          </button>
        </div>
      </nav>

      <LogItemModal
        isOpen={isLogModalOpen}
        onClose={handleCloseLogModal}
        onSubmit={handleLogItemSubmit}
      />

      <SearchResultModal
        isOpen={isSearchModalOpen}
        onClose={handleCloseSearchModal}
        searchResult={searchResult}
      />

      <NotFoundModal
        isOpen={isNotFoundOpen}
        onClose={handleCloseNotFoundModal}
      />
    </>
  );
};

export default Navbar;
