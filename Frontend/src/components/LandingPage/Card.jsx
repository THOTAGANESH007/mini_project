import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div className="card">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2">{description}</p>
      </div>
    </div>
  );
};

export default Card;
