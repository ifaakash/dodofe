"use client";
import React, { useState } from "react";

const Wheel = ({ colors, numArcs, currentColor, setCurrentColor }: any) => {
  const [rotation, setRotation] = useState(-22.5);
  const arcs = [];

  const degreePerArc = 360 / numArcs;

  const getClipPath = (index: number) => {
    const angle = index * degreePerArc - 90;

    const x1 = 3.71 * numArcs + 22.48;

    return `polygon(50% 50%, ${x1}% 0%, 100% 0%)`;
  };

  for (let i = 0; i < numArcs; i++) {
    arcs.push(
      <div
        key={i}
        className="arc"
        style={{
          transform: `rotate(${degreePerArc * i}deg)`,
          backgroundColor: colors[i % colors.length],
          clipPath: getClipPath(i),
        }}
      ></div>
    );
  }

  const rotateWheel = () => {
    setRotation(rotation - degreePerArc);

    const incCurrentColor = currentColor + 1;
    setCurrentColor(incCurrentColor % numArcs);
  };

  return (
    <div>
      <div className="wheel-container">
        <div
          className="wheel"
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={rotateWheel}
        >
          {arcs}
        </div>
      </div>
    </div>
  );
};

export default Wheel;
