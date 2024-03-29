import { Group } from "react-konva";
import { useState, useRef, useEffect, MutableRefObject } from "react";
import { Line } from "react-konva";
import { Group as GroupType } from "konva/lib/Group";
import { TABLET } from "../../helpers/types";

export default function VerticalGridLines({
  screenWidth,
  screenHeight,
  x,
  y,
}: {
  screenWidth: number;
  screenHeight: number;
  x: number;
  y: number;
}) {
  const groupRef: MutableRefObject<GroupType | null> = useRef(null);

  useEffect(() => {
    groupRef.current?.cache();
  }, [groupRef.current]);

  const thickness = 3;

  let lines: number = 0;
  let hSpacing: number;
  if (screenWidth > TABLET) {
    hSpacing = screenWidth / 16;
    lines = 7;
  } else {
    hSpacing = screenWidth / 8;
    lines = 3;
  }

  /**
   * Generate points for vertical lines.
   */
  const generateVLinePoints = () => {
    const points = [];
    // Left side points
    for (let i = 1; i <= lines; i++) {
      points.push([
        i * hSpacing,
        y,
        i * hSpacing - screenWidth / 10,
        screenHeight,
      ]);
    }
    // Right side points
    for (let i = 1; i <= lines; i++) {
      points.push([
        screenWidth - i * hSpacing,
        y,
        screenWidth - i * hSpacing + screenWidth / 10,
        screenHeight,
      ]);
    }
    // Center Point
    points.push([screenWidth / 2, y, screenWidth / 2, screenHeight]);
    return points;
  };

  const [generatedLines, setGeneratedLines] = useState(generateVLinePoints());
  useEffect(() => {
    setGeneratedLines(generateVLinePoints());
  }, [screenWidth, screenHeight]);

  return (
    <Group ref={groupRef}>
      {generatedLines.map((item, index) => {
        return (
          <Line
            key={`vline_${index}`}
            points={item}
            stroke={"#60b5d6"}
            strokeWidth={2}
            closed={true}
          />
        );
      })}
    </Group>
  );
}
