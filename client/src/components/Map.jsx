import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "../styles/Map.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = () => {
  const navigate = useNavigate();

  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [lat, setLat] = useState(23.588);
  const [lon, setLon] = useState(58.3829);

  const [nearestShop, setNearestShop] = useState(null);

  useEffect(() => {
    fetch("https://giftmapu-client.onrender.com/shops")
      .then((res) => res.json())
      .then((data) => setShops(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!shops.length) return;

    navigator.geolocation.getCurrentPosition((p) => {
      const newLat = p.coords.latitude;
      const newLon = p.coords.longitude;

      setLat(newLat);
      setLon(newLon);

      findNearestShop(newLat, newLon, shops);
    });
  }, [shops]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    return Math.sqrt(
      Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2)
    );
  };

  const findNearestShop = (userLat, userLon, shopsData) => {
    if (!shopsData.length) return;

    const nearest = shopsData.reduce((prev, curr) => {
      const prevDist = getDistance(
        userLat,
        userLon,
        prev.location?.lat,
        prev.location?.lng
      );

      const currDist = getDistance(
        userLat,
        userLon,
        curr.location?.lat,
        curr.location?.lng
      );

      return currDist < prevDist ? curr : prev;
    });

    setNearestShop(nearest);
  };

  const filteredShops = shops.filter((shop) => {
    const query = searchQuery.trim().toLowerCase();

    const name = shop.shopName?.toLowerCase() || "";
    const address = shop.address?.toLowerCase() || "";

    return name.includes(query) || address.includes(query);
  });

  return (
    <div className="map-page">

      {/* SEARCH */}
      <div className="map-search">
        <h2>Find Nearby Shops 📍</h2>

        <input
          type="text"
          placeholder="Search shop or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* MAP */}
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        style={{ width: "100%", height: "600px", borderRadius: "15px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* USER LOCATION */}
        <Marker position={[lat, lon]}>
          <Popup>Your Location</Popup>
        </Marker>

        {/* SHOPS */}
        {filteredShops.map((shop) => (
          <Marker
            key={shop._id}
            position={[shop.location?.lat, shop.location?.lng]}
          >
            <Popup>
              <div style={{ textAlign: "center" }}>
                <strong>{shop.shopName}</strong>
                <br />
                {shop.address}
                <br /><br />

                <button
                  onClick={() => navigate(`/shop/${shop._id}`)}
                  style={{
                    padding: "6px 10px",
                    background: "#9b5da3",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* NEAREST SHOP */}
      {nearestShop && (
        <div className="nearest-card">
          <h3>Nearest Shop 📍</h3>
          <p><b>{nearestShop.shopName}</b></p>
          <p>{nearestShop.address}</p>
        </div>
      )}
    </div>
  );
};

export default Map; 
