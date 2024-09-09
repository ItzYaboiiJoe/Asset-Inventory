export const handleModalClose = (
  onClose,
  setShowGaryFields,
  setAssetExists,
  setShowConfirmation
) => {
  onClose();
  setShowGaryFields(false); // Reset the Gary fields visibility when modal closes
  setAssetExists(false); // Reset the assetExists state
  setShowConfirmation(false); // Reset the confirmation modal
};
