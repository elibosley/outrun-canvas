import React, { useEffect, useRef, useState } from "react";
import { Layer, Rect, Text, Line, Group } from "react-konva";
import { Group as GroupType } from "konva/lib/Group";

export const Mountains: React.FC<{
  screenWidth: number;
  screenHeight: number;
}> = ({ screenWidth, screenHeight }) => {
  const groupRef = useRef<GroupType>(null);
  const getRandomMountainHeight = () => {
    return Math.random() * screenHeight * 0.3;
  };

  // Function to generate random number in a range
  function randomRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // Function to generate mountain tops
  function generateMountainTops(numMountains: number, maxHeight: number) {
            const mountainTops = [];
            const stepX = screenWidth / numMountains;
            let prevX = 0;
            let prevY = Math.random() * maxHeight;

            for (let i = 0; i < numMountains; i++) {
              const newX = prevX + stepX;
              const newY = Math.random() * maxHeight;

              mountainTops.push({ x: prevX, y: prevY });

              // Add zigzag lines
              for (let j = prevX + stepX / 10; j < newX; j += stepX / 10) {
                const deltaY = Math.random() * (maxHeight / 4) - maxHeight / 8;
                mountainTops.push({ x: j, y: prevY + deltaY });
              }

              prevX = newX;
              prevY = newY;
            }

            // Connect to the right edge
            mountainTops.push({ x: screenWidth, y: prevY });

            return mountainTops;
  }

  // Generate and draw mountain tops
  const mountainTops = generateMountainTops(2, 150);
  // Generate
  return (
    <Group ref={groupRef}>
      {mountainTops.map((top, index) => (
        <Line
          key={index}
          points={[0, screenHeight / 2, top.x, top.y, screenWidth, screenHeight /2 ]}
          stroke="white"
        />
      ))}
    </Group>
  );
};
