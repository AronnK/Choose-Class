import  { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Confetti = () => {
  useEffect(() => {
    confetti({
      particleCount: 1000,
      spread: 500,
      origin: { y: 0.45 },
      colors: ['#ff007f', '#00bfff', '#39ff14', '#faff00', '#d500f9', '#ff4500', '#00ffff', '#ff073a'],
      shapes: ['circle', 'square', 'triangle', 'line'],
      gravity: 1,
      startVelocity: 50,
      ticks: 200
    });
  }, []);

  return null;
};

export default Confetti;
