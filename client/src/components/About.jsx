import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>WELCOME TO OUR WEB</h1>
        <p>A world of gift shops at your fingertips with GiftMap</p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>About GiftMap</h2>
          <p>
            GiftMap is your smart guide to finding the nearest gift shops around you.
            We make it easy to discover beautiful gifts anytime, anywhere.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We believe that finding the perfect gift should be effortless. Whether you're
            looking for flowers, chocolates, accessories, or unique gifts, GiftMap connects
            you with the best gift shops in your area with just a few clicks.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose GiftMap?</h2>
          <ul>
            <li>📍 Find nearby gift shops instantly</li>
            <li>🔍 Search by location or shop name</li>
            <li>🎁 Browse multiple categories</li>
            <li>🗺️ Interactive map navigation</li>
            <li>💼 Featured stores and recommendations</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions? We'd love to hear from you!<br/>
            Email: info@giftmaps.com<br/>
            Phone: +968 24 123 456<br/>
            Address: Muscat, Oman
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>Copyright © 2026 GiftMaps. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
