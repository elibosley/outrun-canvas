import React, { useEffect, useState, useRef } from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { Image as ImageType } from "konva/lib/shapes/Image";
import { Animation } from "konva/lib/Animation";

export const CarImage: React.FC<{
  screenWidth: number;
  screenHeight: number;
}> = ({ screenWidth, screenHeight }) => {
  const imageRef = useRef<ImageType>(null);
  const [image] = useImage("/car.svg");
  const percentageOfScreenMaxSize = (Math.min(1280, screenWidth) / 1280) * 0.5;
  const imageWidth = 939 * percentageOfScreenMaxSize;
  const imageHeight = 666 * percentageOfScreenMaxSize;
  return (
    <Image
      image={image}
      width={imageWidth}
      height={imageHeight}
      ref={imageRef}
    />
  );
};
