import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios"; // For Postcodes.io
import styles from "../../styles/groupstyle.module.css";
import globalStyles from "../../styles/globalstyle.module.css";

// Fix Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Custom icon for markers
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [32, 32],
});

const Groups = () => {
  const [geoJsonData, setGeoJsonData] = useState(null); // Holds the GeoJSON data
  const [postcode, setPostcode] = useState(""); // Holds the postcode input
  const [userLocation, setUserLocation] = useState(null); // User's location
  const [groups, setGroups] = useState([]); // All groups
  const [nearbyGroups, setNearbyGroups] = useState([]); // Closest groups

  // Load GeoJSON data from the correct path
  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch("/data/essex-boundaries.geojson"); // Update the path if needed
        if (!response.ok) throw new Error("Failed to load GeoJSON file");
        const data = await response.json();
        setGeoJsonData(data);
      } catch (error) {
        console.error("Error fetching GeoJSON:", error);
      }
    };
    fetchGeoJSON();
  }, []);

  // Mock group data
  const mockGroups = [
    {
      name: "Andy's Man Club",
      lat: 51.735,
      lng: 0.469,
      description: "A men's mental health group meeting every Monday.",
      address: "Writtle University Centre, Chelmsford",
    },
    {
      name: "Who Lets The Dads Out?",
      lat: 51.732,
      lng: 0.47,
      description: "Fun and support for dads and kids.",
      address: "The Orchards Cafe, Chelmsford",
    },
  ];

  useEffect(() => {
    setGroups(mockGroups); // Load mock data
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.postcodes.io/postcodes/${postcode}`
      );
      const { latitude, longitude } = response.data.result;
      setUserLocation({ lat: latitude, lng: longitude });

      // Calculate distances and sort by closest
      const sortedGroups = mockGroups
        .map((group) => {
          const distance = getDistance(
            latitude,
            longitude,
            group.lat,
            group.lng
          );
          return { ...group, distance };
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5);

      setNearbyGroups(sortedGroups);
    } catch (error) {
      console.error("Error fetching postcode data:", error);
      alert("Invalid postcode. Please try again.");
    }
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Style for Essex area
  const essexStyle = {
    color: "#0093a2", // Custom color for Essex
    weight: 2,
    fillOpacity: 0.4,
  };


  return (
    <div className={`${styles.groupsPage} ${globalStyles.container}`}>
      <h1 className={`${globalStyles.h1} text-center`}>Find a Support Group</h1>
      <div className={`${styles.searchContainer} flex justify-center my-4`}>
        <input
          type="text"
          className="border-2 border-gray-300 rounded-lg p-2 mr-2"
          placeholder="Enter postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <MapContainer
        center={[51.735, 0.469]}
        zoom={10}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoJsonData && <GeoJSON data={geoJsonData} style={() => essexStyle} />}
      </MapContainer>
      {userLocation && (
        <div className={`${styles.nearbyGroups}`}>
          <h2 className={`${globalStyles.h2} text-center mb-4`}>
            Top 5 Closest Groups
          </h2>
          <ul>
            {nearbyGroups.map((group, index) => (
              <li key={index} className="border p-4 rounded-lg mb-2 shadow-lg">
                <h3 className={`${globalStyles.h3}`}>{group.name}</h3>
                <p>{group.description}</p>
                <p>{group.address}</p>
                <p className="text-gray-600">
                  Distance: {group.distance.toFixed(2)} km
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Groups;