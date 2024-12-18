import React, { useState, useEffect } from "react";
import Card from "./components/card";

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [misses, setMisses] = useState(0);

  // Emojis for the cards
  const emojiData = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🥭", "🥝"];
  const cardData = [...emojiData, ...emojiData]; // Duplicate emojis for pairs

  useEffect(() => {
    const shuffledCards = cardData.map((value, index) => ({
      id: index,
      value,
    }));
    setCards(shuffleArray(shuffledCards));
  }, []);

  // Shuffle the cards
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleCardClick = (card) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.some((flipped) => flipped.id === card.id) ||
      matchedCards.includes(card.id)
    )
      return;

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);

      if (newFlippedCards[0].value === newFlippedCards[1].value) {
        // Match found: Remove cards after 1 second
        setTimeout(() => {
          setMatchedCards((prev) => [
            ...prev,
            newFlippedCards[0].id,
            newFlippedCards[1].id,
          ]);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match: Flip cards back after 1 second
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
        setMisses((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Memory Game</h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) =>
          matchedCards.includes(card.id) ? (
            // Placeholder for matched cards
            <div
              key={card.id}
              className="w-24 h-24 m-2 bg-transparent rounded-lg shadow-lg"
            ></div>
          ) : (
            <Card
              key={card.id}
              card={card}
              handleCardClick={handleCardClick}
              isFlipped={
                flippedCards.includes(card) || matchedCards.includes(card.id)
              }
            />
          )
        )}
      </div>
      <div className="mt-6 text-center">
        <p className="text-xl">Moves: {moves}</p>
        <p className="text-xl">Misses: {misses}</p>
        <p className="text-xl">
          Accuracy: {moves > 0 ? (((moves - misses) / moves) * 100).toFixed(2) : 0}%
        </p>
      </div>
    </div>
  );
};

export default App;
