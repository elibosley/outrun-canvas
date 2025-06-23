import React, { useEffect, useState, useRef, useCallback } from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { Image as ImageType } from "konva/lib/shapes/Image";
import { Animation } from "konva/lib/Animation";
import { CarShadow } from "./carShadow";

interface CarPosition {
  x: number;
  offsetX: number;
  scale: number;
  forwardOffset: number; // Track forward movement
}

const Car: React.FC<{
  screenWidth: number;
  screenHeight: number;
}> = ({ screenWidth, screenHeight }) => {
  // Sun position for shadow calculation
  const sunX = screenWidth / 2;
  const sunRadius = screenWidth < 500 ? screenWidth / 3 : screenWidth / 4;
  const sunY = (screenHeight / 3) * 2 - sunRadius * 0.6;
  const imageRef = useRef<ImageType>(null);
  const [image] = useImage("/car.svg");
  
  // Use refs for animation state to avoid React re-renders
  const trailHistoryRef = useRef<CarPosition[]>([]);
  const forwardMovementRef = useRef(0);
  
  // State for trail rendering - update less frequently
  const [positionHistory, setPositionHistory] = useState<CarPosition[]>([]);
  const [currentOffsetX, setCurrentOffsetX] = useState(0);
  const [currentScale, setCurrentScale] = useState(0.9);
  const [, forceUpdate] = useState(0);

  const getMoveIncrement = useCallback((screenWidth: number) => {
    if (screenWidth < 600) {
      return 1;
    } else if (screenWidth < 1000) {
      return 1.5;
    } else {
      return 1;
    }
  }, []);

  const getPathMaxWidth = useCallback((screenWidth: number) => {
    if (screenWidth < 600) {
      return Math.trunc(screenWidth / 4);
    } else if (screenWidth < 1000) {
      return Math.trunc(screenWidth / 2);
    } else {
      return Math.trunc(screenWidth / 4);
    }
  }, []);

  const percentageOfScreenMaxSize =
    screenWidth < 500 ? 0.2 : (Math.min(1280, screenWidth) / 1280) * 0.25;
  const imageWidth = 939 * percentageOfScreenMaxSize;
  const imageHeight = 666 * percentageOfScreenMaxSize;
  
  // Position car 1/3 between ground and bottom of screen
  // Ground starts at (screenHeight / 3) * 2
  const groundStartY = (screenHeight / 3) * 2;
  const bottomY = screenHeight;
  const carY = groundStartY + (bottomY - groundStartY) * (1/3) - imageHeight;

  const startX = screenWidth / 2 - imageWidth / 2;

  // Speed lines configuration - sync with ground movement
  const maxTrailLength = 6; // Reduced trail length for better performance
  const trailUpdateInterval = 300; // Increased interval for less frequent updates
  const groundSpeed = 0.1; // Match ground horizontal lines speed
  const groundUpdateInterval = 50; // Reduced frequency
  const lineLength = imageHeight * 1.5;

  useEffect(() => {
    if (!imageRef.current) return;

    let x = 0;
    let cumulativeTime = 0;
    let trailUpdateTime = 0;
    let forwardUpdateTime = 0;
    const carMoveIncrement = getMoveIncrement(screenWidth);
    const pathMaxWidth = getPathMaxWidth(screenWidth);
    let addSubtract: 1 | -1 = 1;

    const anim = new Animation(
      (frame) => {
        if (frame && imageRef.current) {
          cumulativeTime += frame.timeDiff;
          trailUpdateTime += frame.timeDiff;
          forwardUpdateTime += frame.timeDiff;

          // Update forward movement less frequently
          if (forwardUpdateTime > groundUpdateInterval) {
            forwardUpdateTime = 0;
            forwardMovementRef.current = (forwardMovementRef.current + groundSpeed) % 2;
          }

          if (cumulativeTime > 10) {
            cumulativeTime = 0;
            
            if (x > pathMaxWidth) {
              addSubtract = -1;
            } else if (x < -pathMaxWidth) {
              addSubtract = 1;
            }
            x = x + carMoveIncrement * addSubtract;
            imageRef.current.offsetX(x);
            setCurrentOffsetX(x); // Update state for effects
            const scale = Math.sin(frame.time / 1000) * 0.1 + 0.9;
            imageRef.current.scale({ x: scale, y: scale });
            setCurrentScale(scale); // Update state for effects

            // Update trail positions in ref (no React re-render)
            if (trailUpdateTime > trailUpdateInterval) {
              trailUpdateTime = 0;
              
              const newPosition = {
                x: startX,
                offsetX: x,
                scale: scale,
                forwardOffset: forwardMovementRef.current
              };
              
              trailHistoryRef.current = [newPosition, ...trailHistoryRef.current].slice(0, maxTrailLength);
              
              // Update React state less frequently for trail rendering
              setPositionHistory([...trailHistoryRef.current]);
            }
          }
        }
      },
      imageRef.current.getLayer()
    );

    anim.start();
    return () => {
      anim.stop();
    };
  }, [screenWidth, screenHeight, startX, getMoveIncrement, getPathMaxWidth]);

  return (
    <>
      {/* Car shadow (render first so it appears behind everything) */}
      <CarShadow
        carX={startX}
        carY={carY}
        carOffsetX={currentOffsetX}
        carScale={currentScale}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        sunX={sunX}
        sunY={sunY}
        screenWidth={screenWidth}
        screenHeight={screenHeight}
      />
      

      
      {/* Car trail */}
      {/* <CarTrail
        positionHistory={positionHistory}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        carY={carY}
        screenHeight={screenHeight}
        screenWidth={screenWidth}
      /> */}
      
      {/* Main car */}
      <Image
        x={startX}
        y={carY}
        image={image}
        width={imageWidth}
        height={imageHeight}
        ref={imageRef}
      />
    </>
  );
};

export default Car;
