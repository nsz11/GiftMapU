import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Home = () => {
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    fetch("https://giftmapu-client.onrender.com/shops")
      .then(res => res.json())
      .then(data => {
        setShop(data[0]); // أول محل فقط في الهوم
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>
            FIND THE NEAREST<br />
            GIFT SHOP TO YOU
          </h1>
        </div>
      </section>

      {/* BUTTONS */}
      <section className="hero-buttons-section">
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/map')}>
            View Map
          </button>

          <button className="btn btn-secondary" onClick={() => navigate('/map')}>
            Find Nearest Shop
          </button>
        </div>
      </section>

      {/* MAP PREVIEW */}
      <section className="map-preview">

        <h2>
          <span className="line" /> EXPLORE THE MAP <span className="line" />
        </h2>

        <div className="map-preview-image">

          {shop && (
            <MapContainer
              center={[shop.location.lat, shop.location.lng]}
              zoom={16}
              style={{
                width: "100%",
                height: "400px",
                borderRadius: "12px"
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap"
              />

              {/* MARKER + NAVIGATION */}
              <Marker
                position={[shop.location.lat, shop.location.lng]}
                eventHandlers={{
                  click: () => navigate(`/shop/${shop._id}`)
                }}
              >
                <Popup>
                  <strong>{shop.shopName}</strong>
                  <br />
                  {shop.address}
                  <br />
                  <small>Click to view details</small>
                </Popup>
              </Marker>

            </MapContainer>
          )}

        </div>

        <button
          className="btn btn-tertiary"
          onClick={() => navigate('/map')}
        >
          Open Full Map
        </button>

      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p className="footer-title">Copyright</p>
        <p>© 2026 GiftMaps. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Home;
