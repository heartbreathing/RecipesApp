import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <div className="footer">
      <h3>Tasty</h3>
      <p>"Discover a world of culinary delights on our recipe website. Explore diverse flavors, create mouthwatering dishes, and embark on a gastronomic journey today!"</p>
      <div className="icon-links">
        <a href="#">
          <FontAwesomeIcon icon={faFacebook} /> 
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faInstagram} /> 
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faYoutube} /> 
        </a>
      </div>
    </div>
  );
};


