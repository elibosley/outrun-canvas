import React, { useEffect, useState, useRef } from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { Image as ImageType } from "konva/lib/shapes/Image";
import { Animation } from "konva/lib/Animation";
import { CarImage } from "./carImage";
const Car: React.FC<{
  screenWidth: number;
  screenHeight: number;
}> = ({ screenWidth, screenHeight }) => {
  const imageRef = useRef<ImageType>(null);
  const [image] = useImage("/car.svg");

  const getMoveIncrement = (screenWidth: number) => {
    if (screenWidth < 600) {
      return 1;
    } else if (screenWidth < 1000) {
      return 2;
    } else {
      return 5;
    }
  };

  const getPathMaxWidth = (screenWidth: number) => {
    if (screenWidth < 600) {
      return Math.trunc(screenWidth / 4);
    } else if (screenWidth < 1000) {
      return Math.trunc(screenWidth / 2);
    } else {
      return Math.trunc(screenWidth / 4);
    }
  };

  const percentageOfScreenMaxSize = (Math.min(1280, screenWidth) / 1280) * 0.5;
  const imageWidth = 939 * percentageOfScreenMaxSize;
  const imageHeight = 666 * percentageOfScreenMaxSize;
  const y = screenHeight - imageHeight;

  const startX = screenWidth / 2 - imageWidth / 2;

  useEffect(() => {
    let x = 0;
    let cumulativeTime = 0;
    let carMoveIncrement = getMoveIncrement(screenWidth);
    let pathMaxWidth = getPathMaxWidth(screenWidth);
    let addSubtract: 1 | -1 = 1;

    const anim = new Animation(
      (frame) => {
        if (frame) {
          cumulativeTime += frame.timeDiff;

          if (cumulativeTime > 10) {
            cumulativeTime = 0;
            if (imageRef.current) {
              if (x > pathMaxWidth) {
                addSubtract = -1;
              } else if (x < -pathMaxWidth) {
                addSubtract = 1;
              }
              x = x + carMoveIncrement * addSubtract;
              imageRef.current.offsetX(x);
            }
          }
        }
      },
      [imageRef.current?.getLayer(), screenWidth]
    );

    anim.start();
    return () => {
      anim.stop();
    };
  }, [imageRef.current]);

  return (
    <Image
      x={startX}
      y={y}
      image={image}
      width={imageWidth}
      height={imageHeight}
      ref={imageRef}
    />
  );
};

export default Car;
