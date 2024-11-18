import React from 'react';
import './CarInfo.css';
import { useLocation } from 'react-router-dom';

const CarInfo = () => {

  const location = useLocation();
  const car = location.state.car;
  const {title, tag, description, images} = car;

  return (
    <div className="car-info-container">
      <h1 className="car-title1">{title}</h1>
      <h3 className="car-tag1">{tag}</h3>
      <p className="car-description1">{description}</p>
      <div className="car-image-container1">
        {images.map((image, index) => (
          <img
            key={index}
            src={`https://car-management-hrir.onrender.com/${image.replace(/\\/g, '/')}`}
            alt={`${title} ${index + 1}`}
            className="car-image1"
          />
        ))}
      </div>
    </div>
  );
};

export default CarInfo;
