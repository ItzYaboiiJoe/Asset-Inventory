import React, { useState } from "react";
import LogItemModal from "./LogItemModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogItemSubmit = (data) => {
    console.log("Logged Item Data:", data);
  };

  return (
    <>
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">IT Asset Management</h1>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleOpenModal}
            className="bg-white text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            Log Item
          </button>
        </div>

        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Lookup by Asset Tag"
            className="p-2 rounded-lg"
          />
        </div>
      </nav>

      <LogItemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleLogItemSubmit}
      />
    </>
  );
};

export default Navbar;
