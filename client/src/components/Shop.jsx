import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Shop.css";

const Shop = () => {
  const navigate = useNavigate();

  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    filterShops();
  }, [searchQuery, shops]);


  const fetchShops = async () => {
    try {

      const res = await fetch("http://localhost:8080/shops");
      const data = await res.json();

      setShops(data);
      setFilteredShops(data);
    } catch (err) {
      console.log("Error fetching shops:", err);
    }
  };


  const filterShops = () => {
    let filtered = shops;

    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredShops(filtered);
  };

  return (
    <div className="shop-page">


      <section className="shop-search">
        <h2>Find Your Favorite Shops</h2>
      </section>

      <div>
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

<br></br>



      <section className="shops-section">


        <div className="shops-grid">
          {filteredShops.length > 0 ? (
            filteredShops.map((shop) => (
              <div className="shop-card" key={shop._id}>


                <div className="shop-image">
                  <img src={shop.shopImage} alt={shop.shopName} />
                </div>


                <div className="shop-info">
                  <h3>{shop.shopName}</h3>
                  <p>{shop.address}</p>
                </div>

                {/* BUTTON */}
                <button
                  className="shop-btn"
                  onClick={() => navigate(`/shop/${shop._id}`)}
                >
                  View Shop
                </button>

              </div>
            ))
          ) : (
            <p className="no-results">No shops found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;