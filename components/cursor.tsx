import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import { Layer, Rect, Text } from "react-konva";

export default function Cursor({
  x,
  y,
  fontSize,
  color,
}: {
  x: number;
  y: number;
  fontSize: number;
  color: string;
}) {
  const [cursorColor, setCursorColor] = useState(color);
  const rectRef: MutableRefObject<any> = useRef();
  const updateCursorColor = () => {
    if (cursorColor === "black") {
      setCursorColor(color);
    } else {
      setCursorColor("black");
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.requestAnimationFrame(updateCursorColor);
      if (rectRef !== undefined && rectRef.current) {
        rectRef.current.cache();
      }
    }, 750);
    return () => {
      clearTimeout(timeout);
    };
  });
  return (
    <Rect
      ref={rectRef}
      x={x}
      y={y}
      width={fontSize / 2 || 8}
      height={fontSize || 16}
      fill={cursorColor}
      shadowBlur={15}
    />
  );
}
