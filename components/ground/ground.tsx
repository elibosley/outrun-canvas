import React from "react";
import { Rect, Group } from "react-konva";
import HorizontalGridLines from "./hlines";
import VerticalGridLines from "./vlines";

export default function Ground({
  screenWidth,
  screenHeight,
}: {
  screenWidth: number;
  screenHeight: number;
}) {
  const x = screenWidth / 2;
  const y = (screenHeight / 3) * 2;

  return (
    <Group>
      <Rect
        x={0}
        y={y}
        width={screenWidth}
        height={screenHeight / 2}
        fill={"black"}
      />
      <VerticalGridLines
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        x={x}
        y={y}
      />
      <HorizontalGridLines
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        x={x}
        y={y}
      />
    </Group>
  );
}
