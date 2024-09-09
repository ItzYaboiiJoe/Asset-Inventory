import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const checkAssetInAllCollections = async (assetTag) => {
  const collectionsToCheck = [
    "Computer",
    "Monitor",
    "Server",
    "Switches",
    "iPads",
    "Gary",
  ];
  let assetData = null;
  let foundInCollection = null; // To track the collection where asset was found

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
        collection: collectionName, // Store the collection name
      };
      foundInCollection = collectionName;
      break;
    }
  }
  return { assetData, foundInCollection };
};
