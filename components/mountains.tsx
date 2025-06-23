import React, { useEffect, useRef, useState } from "react";
import { Line, Group, Shape } from "react-konva";
import { Group as GroupType } from "konva/lib/Group";

export const Mountains: React.FC<{
  screenWidth: number;
  screenHeight: number;
}> = ({ screenWidth, screenHeight }) => {
  const [mountainTops, setMountainTops] = useState<{ x: number; y: number }[]>(
    []
  );
  const groupRef = useRef<GroupType>(null);

  // Function to calculate height based on distance from center (outrun style)
  const calculateHeightFactor = (x: number) => {
    const centerX = screenWidth / 2;
    const distanceFromCenter = Math.abs(x - centerX);
    const maxDistance = screenWidth / 2;
    
    // Create a smooth curve that goes to max in the center and 0 at edges
    // Using a quadratic function for smooth transitions
    const normalizedDistance = distanceFromCenter / maxDistance;
    return 1 - Math.pow(normalizedDistance, 1.5); // Inverted: 1 at center, 0 at edges
  };
   
  function generateMountainTops(numMountains: number, maxHeight: number) {
    const tops = [];

    for (let i = 0; i <= numMountains; i++) {
      const newX = (i / numMountains) * screenWidth;
      const heightFactor = calculateHeightFactor(newX);
      
      // Add some randomness while maintaining the overall outrun shape
      const randomVariation = 0.8 + Math.random() * 0.4; // Random between 0.8 and 1.2
      // Invert the height: high mountains at edges (small y), valley at center (large y)
      const newY = maxHeight * (1 - heightFactor) * randomVariation;

      tops.push({ x: newX, y: newY });
    }

    return tops;
  }

  // Initialize mountain tops
  useEffect(() => {
    const initialMountainTops = generateMountainTops(20, screenHeight / 3);
    setMountainTops(initialMountainTops);
  }, [screenHeight, screenWidth]);



  return (
    <Group ref={groupRef} y={screenHeight / 3}>
      <Line
        points={mountainTops.flatMap((point) => [point.x, point.y])}
        stroke="white"
        lineJoin="round"
      />
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.beginPath();
          context.moveTo(0, screenHeight);
          mountainTops.forEach((top) => context.lineTo(top.x, top.y));
          context.lineTo(screenWidth, screenHeight);
          context.closePath();
          // Fill with the specified color
          context.fillStrokeShape(shape);
        }}
        fill="#311854"
      />
    </Group>
  );
};
