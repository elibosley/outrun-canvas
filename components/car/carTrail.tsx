import React, { useMemo } from "react";
import { Line } from "react-konva";

interface CarPosition {
  x: number;
  offsetX: number;
  scale: number;
  forwardOffset: number;
}

interface CarTrailProps {
  positionHistory: CarPosition[];
  imageWidth: number;
  imageHeight: number;
  carY: number;
  screenHeight: number;
  screenWidth: number;
}

export const CarTrail: React.FC<CarTrailProps> = React.memo(({
  positionHistory,
  imageWidth,
  imageHeight,
  carY,
  screenHeight,
  screenWidth,
}) => {
  // Memoize wheel width calculation - spread to actual wheel positions at image edges
  const wheelWidth = useMemo(() => imageWidth * 0.85, [imageWidth]);
  const wheelY = useMemo(() => carY + imageHeight, [carY, imageHeight]); // Start at bottom of car image

  // Calculate wheel positions relative to car center
  // carX is the left edge of the car, so we need to find the actual center
  // then account for offsetX moving the car in the opposite direction
  const getWheelPositions = useMemo(() => (carX: number, carOffsetX: number) => {
    const carCenterX = carX + imageWidth / 2 - carOffsetX;
    return {
      leftWheel: { x: carCenterX - wheelWidth / 2, y: wheelY },
      rightWheel: { x: carCenterX + wheelWidth / 2, y: wheelY }
    };
  }, [wheelWidth, wheelY, imageWidth]);

    // Memoize smooth trail paths calculation - like flames/tire marks left on pavement
  const { leftTrailPoints, rightTrailPoints, trailWidths } = useMemo(() => {
    if (positionHistory.length <= 1) {
      return { leftTrailPoints: [], rightTrailPoints: [], trailWidths: [] };
    }

    const leftPoints: number[] = [];
    const rightPoints: number[] = [];
    const widths: number[] = [];
    
    // Calculate the starting Y position (exactly at bottom of car image)
    const startY = carY + imageHeight + 16; // Small offset to ensure it's right at the bottom edge
    // Calculate how much vertical space we have to work with
    const availableHeight = screenHeight - startY;
    // Use fixed segment height based on max trail length to prevent growth effect
    const maxTrailLength = 6; // Should match the maxTrailLength from car component
    const segmentHeight = availableHeight / (maxTrailLength - 1);
    
    // Calculate perspective spreading - same as vlines.tsx uses (screenWidth / 10)
    const perspectiveSpread = screenWidth / 10;
    const screenCenterX = screenWidth / 2;

    // Build curved paths with interpolation for higher framerate
    const interpolationFactor = 4; // Create 4x more segments through interpolation
    
    for (let i = 0; i < positionHistory.length - 1; i++) {
      const currentPos = positionHistory[i];
      const nextPos = positionHistory[i + 1];
      
      // Create interpolated segments between each pair of positions
      for (let j = 0; j < interpolationFactor; j++) {
        const t = j / interpolationFactor; // Interpolation factor between 0 and 1
        const segmentIndex = i * interpolationFactor + j;
        
        // Interpolate position values
        const interpolatedX = currentPos.x + (nextPos.x - currentPos.x) * t;
        const interpolatedOffsetX = currentPos.offsetX + (nextPos.offsetX - currentPos.offsetX) * t;
        const interpolatedScale = currentPos.scale + (nextPos.scale - currentPos.scale) * t;
        const interpolatedForwardOffset = currentPos.forwardOffset + (nextPos.forwardOffset - currentPos.forwardOffset) * t;
        
        // Get the actual wheel positions from this interpolated moment
        const wheels = getWheelPositions(interpolatedX, interpolatedOffsetX);
        const y = startY + (segmentIndex * segmentHeight / interpolationFactor);
        
        // Calculate perspective spreading for this point
        const spreadFactor = (y - startY) / availableHeight;
        
        // Apply perspective spreading to preserve the car's actual path
        const leftOffset = wheels.leftWheel.x - screenCenterX;
        const rightOffset = wheels.rightWheel.x - screenCenterX;
        
        const leftX = screenCenterX + (leftOffset * (1 + spreadFactor * perspectiveSpread / screenCenterX));
        const rightX = screenCenterX + (rightOffset * (1 + spreadFactor * perspectiveSpread / screenCenterX));
        
        leftPoints.push(leftX, y);
        rightPoints.push(rightX, y);
        
        // Calculate width for this point - grows as we go down, bigger segments
        const baseWidth = 12;
        const width = baseWidth + (segmentIndex * 3 / interpolationFactor); // Adjusted growth for interpolated segments
        widths.push(width);
      }
    }
    
    // Add the final position
    if (positionHistory.length > 0) {
      const lastPos = positionHistory[positionHistory.length - 1];
      const wheels = getWheelPositions(lastPos.x, lastPos.offsetX);
      const finalSegmentIndex = (positionHistory.length - 1) * interpolationFactor;
      const y = startY + (finalSegmentIndex * segmentHeight / interpolationFactor);
      
      const spreadFactor = (y - startY) / availableHeight;
      const leftOffset = wheels.leftWheel.x - screenCenterX;
      const rightOffset = wheels.rightWheel.x - screenCenterX;
      
      const leftX = screenCenterX + (leftOffset * (1 + spreadFactor * perspectiveSpread / screenCenterX));
      const rightX = screenCenterX + (rightOffset * (1 + spreadFactor * perspectiveSpread / screenCenterX));
      
      leftPoints.push(leftX, y);
      rightPoints.push(rightX, y);
      
      const baseWidth = 12;
      const width = baseWidth + (finalSegmentIndex * 3 / interpolationFactor);
      widths.push(width);
    }

    return { leftTrailPoints: leftPoints, rightTrailPoints: rightPoints, trailWidths: widths };
  }, [positionHistory, getWheelPositions, carY, imageHeight, screenHeight, screenWidth, imageWidth]);

  if (positionHistory.length <= 1) {
    return null;
  }

  return (
    <>
      {/* TRON-style segmented tire tracks - each segment grows in width */}
      {leftTrailPoints.length >= 4 && rightTrailPoints.length >= 4 && (
        <>
          {/* Render each segment of the left wheel track */}
          {Array.from({ length: Math.floor(leftTrailPoints.length / 2) - 1 }, (_, i) => {
            const startIdx = i * 2;
            const endIdx = (i + 1) * 2;
            const segmentPoints = [
              leftTrailPoints[startIdx], leftTrailPoints[startIdx + 1],
              leftTrailPoints[endIdx], leftTrailPoints[endIdx + 1]
            ];
            
            return (
              <Line
                key={`left-segment-${i}`}
                points={segmentPoints}
                stroke="#00ffff"
                strokeWidth={trailWidths[i] || 6}
                opacity={Math.max(0.3, 1.0 - (i * 0.15))} // Fade out older segments
                lineCap="round"
                lineJoin="round"
                tension={0.6}
              />
            );
          })}
          
          {/* Render each segment of the right wheel track */}
          {Array.from({ length: Math.floor(rightTrailPoints.length / 2) - 1 }, (_, i) => {
            const startIdx = i * 2;
            const endIdx = (i + 1) * 2;
            const segmentPoints = [
              rightTrailPoints[startIdx], rightTrailPoints[startIdx + 1],
              rightTrailPoints[endIdx], rightTrailPoints[endIdx + 1]
            ];
            
            return (
              <Line
                key={`right-segment-${i}`}
                points={segmentPoints}
                stroke="#00ffff"
                strokeWidth={trailWidths[i] || 6}
                opacity={Math.max(0.3, 1.0 - (i * 0.15))} // Fade out older segments
                lineCap="round"
                lineJoin="round"
                tension={0.6}
              />
            );
          })}
        </>
      )}
    </>
  );
}); 