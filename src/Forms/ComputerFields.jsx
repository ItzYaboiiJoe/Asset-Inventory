const ComputersFields = () => {
  return (
    <>
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
    </>
  );
};

export default ComputersFields;
