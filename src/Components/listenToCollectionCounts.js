import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const listenToCollectionCounts = (callback) => {
  const collections = ["Computer", "Monitor", "Server", "Switches", "iPads"];
  let unsubscribes = [];

  const assetCounts = new Array(collections.length).fill(0);

  collections.forEach((collectionName, index) => {
    const collectionRef = collection(db, collectionName);

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      assetCounts[index] = snapshot.size;
      const totalAssets = assetCounts.reduce((acc, count) => acc + count, 0);
      callback(assetCounts, totalAssets);
    });

    unsubscribes.push(unsubscribe);
  });

  return () => {
    unsubscribes.forEach((unsubscribe) => unsubscribe());
  };
};
