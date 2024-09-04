import React, { useState, useEffect } from "react";
import "./Dice.css";

const Dice = ({ onRollComplete }) => {
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);

    setTimeout(() => {
      setRolling(false);
      onRollComplete();
    }, 2000); // Matches animation duration
  };

  return (
    <div className={`dice ${rolling ? "rolling" : ""}`} onClick={rollDice}>
      🎲
    </div>
  );
};

export default Dice;
