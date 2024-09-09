useEffect(() => {
  const collections = ["Computer", "Monitor", "Server", "Switches", "iPads"];
  let allActivities = [];

  const fetchRecentActivity = () => {
    const unsubscribeArray = collections.map((collectionName) => {
      const q = query(collection(db, collectionName));
      return onSnapshot(q, (snapshot) => {
        const activities = snapshot.docs.map((doc) => {
          const data = doc.data();
          const checkInDate = data.checkIn ? data.checkIn.toDate() : null;
          const checkOutDate = data.checkOut ? data.checkOut.toDate() : null;
          const latestDate =
            checkInDate > checkOutDate ? checkInDate : checkOutDate;

          const formattedDate = latestDate
            ? latestDate.toLocaleString()
            : "N/A";

          return {
            AssetTag: doc.id,
            value:
              collectionName === "Computer"
                ? data.owner || "N/A"
                : collectionName === "Monitor"
                ? data.model || "N/A"
                : data.serialNumber || "N/A",
            location: data.currentLocation || "N/A",
            checkDate: formattedDate,
            checkType:
              checkInDate > checkOutDate ? "Checked In" : "Checked Out",
            collection: collectionName,
          };
        });
        allActivities = [
          ...allActivities.filter(
            (activity) => activity.collection !== collectionName
          ),
          ...activities,
        ];

        allActivities.sort(
          (a, b) => new Date(b.checkDate) - new Date(a.checkDate)
        );

        setActivityData(allActivities.slice(0, 5));
      });
    });

    return () => {
      unsubscribeArray.forEach((unsubscribe) => unsubscribe());
    };
  };

  fetchRecentActivity();
}, []);
