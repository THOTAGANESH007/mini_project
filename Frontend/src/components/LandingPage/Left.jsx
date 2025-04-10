import React from 'react';
import Card from './Card';
import '../../style/Home.css';
import allEvents from '../Events/events';
function Left() {
  const cards = [
    { title: "Card 1", description: "This is card 1" },
    { title: "Card 2", description: "This is card 2" },
    { title: "Card 3", description: "This is card 3" },
    { title: "Card 4", description: "This is card 4" },
    { title: "Card 5", description: "This is card 5" },
    { title: "Card 6", description: "This is card 6" },
  ];

  return (
    <div className="scroll-container-left">
      <div className="scroll-content-left">
        {/* Original cards */}
        {allEvents.map((card, index) => (
          <Card key={index} {...card} />
        ))}

        {/* Duplicate cards for seamless scrolling */}
        {cards.map((card, index) => (
          <Card key={`duplicate-${index}`} {...card} />
        ))}
      </div>
    </div>
  );
}

export default Left;
