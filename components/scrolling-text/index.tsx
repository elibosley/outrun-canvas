import React, { useEffect, useRef, useState } from "react";
import { Text } from "react-konva";
import { Text as TextType } from "konva/types/shapes/Text";

export default function ScrollingText({
  screenWidth,
  screenHeight,
}: {
  screenWidth: number;
  screenHeight: number;
}) {
  const textRef = useRef<TextType | null>(null);
  let textWidth: number = 0;

  useEffect(() => {
    if (textRef.current) {
      textWidth = textRef.current.getTextWidth();
    }
  }, [textRef]);

  const [x, setX] = useState(screenWidth / 2 - textWidth / 2);

  const getNewX = () => {
    setX(x - 2);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      requestAnimationFrame(getNewX);
      textRef.current?.cache();
    }, 5);
    return () => clearTimeout(timeout);
  });
  return (
    <Text
      ref={textRef}
      x={x}
      y={screenHeight * 0.25}
      text={"Thanks for visiting! Click to see more on Github..."}
      fontSize={32}
      fontFamily={`'Anonymous Pro', monospace`}
      fill={"white"}
      shadowBlur={100}
    />
  );
}
