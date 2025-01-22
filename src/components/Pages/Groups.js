import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios"; // For Postcodes.io
import styles from "../../styles/groupstyle.module.css";
import globalStyles from "../../styles/globalstyle.module.css";
import { useRef } from "react";
import usePopupWidth from "../../hooks/usePopupWidth";

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
  const mapRef = useRef(null); // Reference to the map instance
  const popupWidth = 450; // Define the desired popup width
  const popupRef = usePopupWidth(popupWidth); // Use the custom hook
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
      name: "Andy's Man Club - Chelmsford",
      lat: 51.73461175423453,
      lng: 0.42884235449032687,
      description:
        "ANDYSMANCLUB are a men’s suicide prevention charity, offering free-to-attend peer-to-peer support groups across the United Kingdom and online. They want to end the stigma surrounding men’s mental health and help men through the power of conversation. #ITSOKAYTOTALK. They meet at 7pm on Monday's (Except Bank Holidays)",
      address:
        "Writtle University Centre for Health & Sport, Lordship Rd, Writtle, Chelmsford CM1 3RR",
      image: `${process.env.PUBLIC_URL}/images/Groups/AndysManClub.png`,
      website: "https://andysmanclub.co.uk",
      facebook:
        "https://www.facebook.com/p/Andys-Man-Club-Chelmsford-100076166713585/",
    },
    {
      name: "The Sanctuary - Men's Wellbeing Hub",
      lat: 51.79613420255909,
      lng: 1.0568136738070226,
      description:
        "The Sanctuary Men's Wellbeing Hub offers a relaxed space for men to come together, socialise, and engage in activities like fixing things, painting, and discussing various topics — all while enjoying some tea! This group provides an opportunity to meet new friends and share experiences in a comfortable and friendly environment. It’s a great place for those looking for connection, conversation, and hands-on activities. They meet every Wednesday from 10:30 a.m. to 1:00 p.m.",
      address: "Greenland Grove Animal Sanctuary, St Osyth, CO16 8JE",
      image: `${process.env.PUBLIC_URL}/images/Groups/thesanctuary.png`,
      website: "https://greenlandgrovesanctuary.co.uk/",  
      email: "contact@andysmanclub.co.uk",
    },
    {
      name: "Who Let The Dads Out?",
      lat: 51.72497629708332,
      lng: 0.49350432168396113,
      description:
        "Who Let The Dads Out? Groups are for fathers, father figures and their children – places where you can have fun, form friendships and find support. They meet on the last Saturday of the month at 08:30 - 11 a.m. Children 0-11 years.",
      address: "The Orchards Cafe, Mascalls way, Chelmsford, CM2 7NS",
      image: `${process.env.PUBLIC_URL}/images/Groups/WLTDO.png`,
      website: "https://www.meadgatechurch.org.uk/",
      email: "cafemanager@meadgatechurch.org.uk",
      contactNumber: "Tim Ball 01245 690710",
    },
    {
      name: "Men’s Walk & Talk",
      lat: 51.84374291006043,
      lng: 1.2494844333323274,
      description:
        "Men’s Walk & Talk is a new initiative by Tendring Wellbeing and Intervention Services aimed at breaking the stigma surrounding men’s mental health. The group encourages men to openly talk about their feelings while enjoying a leisurely walk. Recognising that many men struggle to discuss their mental health, this initiative provides a safe and supportive environment where participants can walk, talk, and connect with others who may be facing similar challenges. The group meets every Monday at 10 a.m. outside Frinton Community Centre. No booking is required.",
      address: "Soken House/Triangle Shopping Centre, Frinton-on-Sea CO13 0AU",
      image: `${process.env.PUBLIC_URL}/images/Groups/Tendering.png`,
      contactNumber: "Kevin 07966 545502",
      email: "info@tendringwellbeingandi.co.uk",
    },
    {
      name: "Andy's Man Club - Basildon",
      lat: 51.56391613978842,
      lng: 0.4082080774956494,
      description:
        "ANDYSMANCLUB are a men’s suicide prevention charity, offering free-to-attend peer-to-peer support groups across the United Kingdom and online. They want to end the stigma surrounding men’s mental health and help men through the power of conversation. #ITSOKAYTOTALK. They meet at 7pm on Monday's (Except Bank Holidays)",
      address:
        "Lincewood Primary School, Berry Ln, Langdon Hills, Basildon SS16 6AZ",
      image: `${process.env.PUBLIC_URL}/images/Groups/AndysManClub.png`,
      website: "https://andysmanclub.co.uk",
      facebook: "https://www.facebook.com/people/Andys-Man-Club-Basildon/100083331752868/",
    },
    {
      name: "Who Let The Dads Out?",
      lat: 51.6205379330216,
      lng: 0.4158009970802278,
      description:
        "Who Let The Dads Out? Groups are for fathers, father figures and their children – places where you can have fun, form friendships and find support. They meet on the first Saturday of the month at 08:30 - 10 a.m. Children 0-5 years.",
      address: "Emmanuel Church, Laindon Road, Billericay, Essex, CM12 9LD",
      image: `${process.env.PUBLIC_URL}/images/Groups/WLTDO.png`,
      website: "https://www.billericaychurches.org/emmanuel/church-groups/who-let-the-dads-out.html",
      email: "tony.wallace@billericaychurches.org",
      contactNumber: "Tony Wallace 01268 710362",
      facebook: "https://www.facebook.com/EmmanuelChurchBillericay/",
    },
    {
      name: "DadsCafe Brentwood",
      lat: 51.62592618390134,
      lng: 0.3301512756482639,
      description:
        "The DadsCafe are a relaxed dad and baby group for babies up to the age of 18 months.There's stay and play in both of the halls, just rock up and go at any time between 0900 and midday. They are a strictly dad only group, however mums are very welcome to pop by for a cuppa or to breastfeed in the public areas outside of the halls/breastfeeding room at any point during the meeting. There is no need to book, just turn up for a chat.",
      address: "Roundwood Ave, Brentwood CM13 2NA",
      image: `${process.env.PUBLIC_URL}/images/Groups/DadsCafeBrentwood.png`,
      facebook: "https://www.facebook.com/TheDadsCafe",
    },
    {
      name: "Who Let The Dads Out?",
      lat: 51.62592618390134,
      lng: 0.3301512756482639,
      description:
        "Who Let The Dads Out? Groups are for fathers, father figures and their children – places where you can have fun, form friendships and find support. They usually meet on the first Saturday of the month but it is advised to check their Facebook page to make sure. Children 0-5 years.",
      address: "Roundwood Ave, Brentwood CM13 2NA",
      image: `${process.env.PUBLIC_URL}/images/Groups/WLTDO.png`,
      facebook: "http://www.facebook.com/BrentwoodDads",
      contactNumber: "Dan - 07545 500689",
    },
    {
      name: "Andy's Man Club - Hockley",
      lat: 51.60619113771496,
      lng: 0.6649590886033767,
      description:
        "ANDYSMANCLUB are a men’s suicide prevention charity, offering free-to-attend peer-to-peer support groups across the United Kingdom and online. They want to end the stigma surrounding men’s mental health and help men through the power of conversation. #ITSOKAYTOTALK. They meet at 7pm on Monday's (Except Bank Holidays).",
      address: "Greensward Academy, Greensward Lane, Hockley, SS5 5HG",
      image: `${process.env.PUBLIC_URL}/images/Groups/AndysManClub.png`,
      website: "https://andysmanclub.co.uk",
      facebook: "https://www.facebook.com/people/Andys-Man-Club-Hockley/61563610064118/",
    },
    {
      name: "Andy's Man Club - Southend-on-Sea",
      lat: 51.54914504672963,
      lng: 0.7022737370174067,
      description:
        "ANDYSMANCLUB are a men’s suicide prevention charity, offering free-to-attend peer-to-peer support groups across the United Kingdom and online. They want to end the stigma surrounding men’s mental health and help men through the power of conversation. #ITSOKAYTOTALK. They meet at 7pm on Monday's (Except Bank Holidays).",
      address: "Writtle University Centre, Chelmsford",
      image: `${process.env.PUBLIC_URL}/images/Groups/AndysManClub.png`,
      website: "https://andysmanclub.co.uk",
      facebook: "https://www.facebook.com/people/Andys-Man-Club-Southend-on-Sea/100067854443238/",
    },
    {
      name: "Who Let The Dads Out?",
      lat: 51.526996048118136,
      lng: 0.46674726764930224,
      description:
        "Who Let The Dads Out? Groups are for fathers, father figures and their children – places where you can have fun, form friendships and find support. They meet on the 1st Saturday of the month 08:30-10:30 a.m. Children 0-6 years.",
      address: "45 Fobbing Rd, Corringham, Stanford-le-Hope SS17 9BN",
      image: `${process.env.PUBLIC_URL}/images/Groups/WLTDO.png`,
      website: "https://www.corringhamchurch.co.uk/clubs-groups/who-let-the-dads-out/",
      facebook: "https://www.facebook.com/wltdocorringham",
      email: "chris@corringhamevangelical.co.uk",
      contactNumber: "Chris Mayers 07809 758596"
    },
    {
      name: "Who Let The Dads Out?",
      lat: 51.603250591412746,
      lng: 0.020251938871371458,
      description:
        "Who Let The Dads Out? Groups are for fathers, father figures and their children – places where you can have fun, form friendships and find support. They meet on the 2nd Saturday of the month 9-11 a.m. during school term times. Children 0-4 years. £3.00 per session - no need to book just turn up!",
      address:
        "Salway Evangelical Church, Forest Approach, Woodford Green, Essex, IG8 9BW",
      image: `${process.env.PUBLIC_URL}/images/Groups/WLTDO.png`,
      website: "https://www.salway.org/",
      facebook: "https://www.facebook.com/salwayec",
      email: "ann4salway@gmail.com",
      contactNumber: "Ann Burgess 07802 821556"
    },
    {
      name: "Who Let The Dads Out?",
      lat: 51.61429107511141,
      lng: 0.02678943517019749,
      description:
        "Who Let The Dads Out? Groups are for fathers, father figures and their children – places where you can have fun, form friendships and find support. They meet on the 3rd Saturday of every month 9-11am. Children 0-5 years. £5 per family. No need to book.",
      address: "All Saints Church, Inmans Row, Woodford Green, Essex, IG8 0NH",
      image: `${process.env.PUBLIC_URL}/images/Groups/WLTDO.png`,
      website: "https://www.asww.org.uk/kids",
      facebook: "https://www.facebook.com/WLTDOasww",
      email: "wltdo@asww.org.uk",
      contactNumber: "Rob Santer 020 8504 0266"
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
  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
  whenCreated={(map) => {
    mapRef.current = map;
  }}
>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoJsonData && <GeoJSON data={geoJsonData} style={() => essexStyle} />}
        {/* Add Markers */}
        {groups.map((group, index) => (
         <Marker
         key={index}
         position={[group.lat, group.lng]}
         icon={customIcon}
         eventHandlers={{
          click: () => {
            setNearbyGroups((prev) => {
              // If the group isn't already in the list, add it
              const updatedList = [group, ...prev.filter((item) => item.name !== group.name)];
              return updatedList.length ? updatedList : [group];
            });
          },
        }}
        
       >
       
            <Popup ref={popupRef} maxWidth={450} minWidth={450}>
  <div className={styles["leaflet-popup-content"]}>
    {/* Main content: Image and Information */}
    <div className={styles["popup-main-content"]}>
      <div className={styles["popup-image"]}>
        <img
          src={group.image}
          alt={`${group.name} logo`}
        />
      </div>
      <div className={styles["popup-text"]}>
        <h3 className={styles["popupHeading"]}>{group.name}</h3>
        <p className={styles["popupText"]}>{group.description}</p>
        <p className={styles["popupAddress"]}>{group.address}</p>
      </div>
    </div>

    {/* Footer: Contact Information */}
    <div className={styles["popup-footer"]}>
      {group.website && (
        <a
          href={group.website}
          target="_blank"
          rel="noopener noreferrer"
          className={styles["popup-footer-item"]}
        >
          🌐 <span>Website</span>
        </a>
      )}
      {group.facebook && (
        <a
          href={group.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={styles["popup-footer-item"]}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/icons/facebook-icon.png`}
            alt="Facebook"
          />
          <span>Facebook</span>
        </a>
      )}
      {group.contactNumber && (
        <a href={`tel:${group.contactNumber}`} className={styles["popup-footer-item"]}>
          📞 <span>{group.contactNumber}</span>
        </a>
      )}
      {group.email && (
        <a href={`mailto:${group.email}`} className={styles["popup-footer-item"]}>
          ✉️ <span>Email</span>
        </a>
      )}
    </div>
  </div>
</Popup>
          </Marker>
        ))}
      </MapContainer>
      {userLocation && (
        <div className={`${styles.nearbyGroups}`}>
          <h2 className={`${globalStyles.h2} text-center mb-4`}>
            Top 5 Closest Groups
          </h2>
          <ul>
            {nearbyGroups.map((group, index) => (
             <li
             key={index}
             className="border p-4 rounded-lg mb-2 shadow-lg flex justify-between items-center"
             onClick={() => {
              if (mapRef.current) {
                mapRef.current.setView([group.lat, group.lng], 15, { animate: true });
              }
            }}
            
           >
           
                <div>
                  <h3 className={`${globalStyles.h3}`}>{group.name}</h3>
                  <p>{group.description}</p>
                  <p>{group.address}</p>
                  <p className="text-gray-600">
  {group.distance ? `Distance: ${group.distance.toFixed(2)} km` : ""}
</p>

                </div>
                <img
                  src={group.image}
                  alt={`${group.name} logo`}
                  className="w-16 h-16 object-contain ml-4"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Groups;
