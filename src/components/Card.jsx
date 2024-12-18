import React from "react";

const Card = ({ card, handleCardClick, isFlipped }) => {
  return (
    <div
      className={`w-24 h-24 m-2 bg-gray-800 rounded-lg shadow-lg cursor-pointer flex items-center justify-center text-3xl transform transition-transform duration-500 ${
        isFlipped ? "rotate-y-180" : ""
      }`}
      onClick={() => handleCardClick(card)}
    >
      {isFlipped ? (
        <span className="text-white">{card.value}</span>
      ) : (
        <div className="bg-gray-600 w-full h-full rounded-lg"></div>
      )}
    </div>
  );
};

export default Card;
