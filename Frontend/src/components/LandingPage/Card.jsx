import React from 'react';

const Card = ({ title, description, image, onClick }) => {
  return (
    <div className="card cursor-pointer" onClick={onClick}>
      <img
        style={{ height: "100%", borderRadius: "10px" }}
        src={image}
        alt={title}
        className="object-cover"
      />
    </div>
  );
};

export default Card;
