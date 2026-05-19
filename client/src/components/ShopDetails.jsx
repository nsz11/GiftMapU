import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Shop.css";

const Shop = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    fetch(`https://giftmapu-server.onrender.com/shops/${id}`)
      .then(res => res.json())
      .then(data => setShop(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!shop) return <p>Loading...</p>;

  return (
    <div className="shop-page">

      {/* IMAGE HEADER */}
      <div className="shop-hero">
        <img src={shop.shopImage} alt={shop.shopName} />
        <div className="overlay">
          <h1>{shop.shopName}</h1>
        </div>
      </div>

      {/* INFO */}
      <div className="shop-content">

        <div className="shop-card">
          <h2>📍 Location</h2>
          <p>{shop.address}</p>
        </div>

        <div className="shop-card">
          <h2>📞 Contact</h2>
          <p>{shop.contact}</p>
        </div>

        <div className="shop-card">
          <h2>🛍 About</h2>
          <p>
            Welcome to {shop.shopName}, your destination for unique and beautiful gifts.
            We offer a variety of items carefully selected to make every occasion special.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Shop;
