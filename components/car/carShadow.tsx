import React, { useMemo } from "react";
import { Shape } from "react-konva";

interface CarShadowProps {
  carX: number;
  carY: number;
  carOffsetX: number;
  carScale: number;
  imageWidth: number;
  imageHeight: number;
  sunX: number;
  sunY: number;
  screenWidth: number;
  screenHeight: number;
}

export const CarShadow: React.FC<CarShadowProps> = ({
  carX,
  carY,
  carOffsetX,
  carScale,
  imageWidth,
  imageHeight,
  sunX,
  sunY,
  screenWidth,
  screenHeight,
}) => {
  const shadowPath = useMemo(() => {
    const carCenterX = carX + imageWidth / 2 - carOffsetX;
    
    // Calculate scaled car dimensions
    const scaledWidth = (imageWidth * carScale) + 55;
    const scaledHeight = imageHeight * carScale;
    const scaledCarBottomY = carY + scaledHeight - 15;
    
    // Calculate shadow direction based on sun position
    const sunToCarX = carCenterX - sunX;
    const sunToCarY = scaledCarBottomY - sunY;
    
    // Normalize the direction vector
    const distance = Math.sqrt(sunToCarX * sunToCarX + sunToCarY * sunToCarY);
    const dirX = sunToCarX / distance;
    const dirY = sunToCarY / distance;
    
    // Shadow length - longer and more dramatic, scaled with car
    const baseShadowLength = Math.min(screenHeight * 0.8, imageHeight * 3);
    const shadowLength = baseShadowLength * carScale;
    
    // Calculate shadow end points
    const shadowEndX = carCenterX + dirX * shadowLength;
    const shadowEndY = scaledCarBottomY + dirY * shadowLength;
    
    // Create a more realistic car-shaped shadow
    const carWidth = scaledWidth * 0.9; // Closer to actual car width
    const shadowStartWidth = carWidth * 0.7; // Shadow starts narrower
    const shadowEndWidth = carWidth * 0.3; // Shadow ends much narrower
    
    // Add some perspective distortion
    const perspectiveOffset = (shadowLength / screenHeight) * 20;
    
    return {
      startLeft: carCenterX - shadowStartWidth / 2,
      startRight: carCenterX + shadowStartWidth / 2,
      startY: scaledCarBottomY,
      endLeft: shadowEndX - shadowEndWidth / 2 + perspectiveOffset,
      endRight: shadowEndX + shadowEndWidth / 2 - perspectiveOffset,
      endY: shadowEndY,
    };
  }, [carX, carY, carOffsetX, carScale, imageWidth, imageHeight, sunX, sunY, screenWidth, screenHeight]);

  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        
        // Draw trapezoid shadow
        context.moveTo(shadowPath.startLeft, shadowPath.startY);
        context.lineTo(shadowPath.startRight, shadowPath.startY);
        context.lineTo(shadowPath.endRight, shadowPath.endY);
        context.lineTo(shadowPath.endLeft, shadowPath.endY);
        context.closePath();
        
        // Fill with better gradient - darker and more realistic
        const gradient = context.createLinearGradient(
          shadowPath.startLeft, shadowPath.startY,
          shadowPath.endLeft, shadowPath.endY
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.6)'); // Darker at car
        gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.4)'); // Medium darkness
        gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.2)'); // Lighter
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.0)'); // Transparent at end
        
        context.fillStyle = gradient;
        context.fill();
      }}
    />
  );
}; 