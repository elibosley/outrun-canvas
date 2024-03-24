import React, { useEffect, useRef } from "react";
import { Line, Group, Circle } from "react-konva";
import { Group as GroupType } from "konva/lib/Group";
import { Animation } from "konva/lib/Animation";

export default function Sun({
  screenWidth,
  screenHeight,
}: {
  screenWidth: number;
  screenHeight: number;
}) {
  const x = screenWidth / 2;

  const radius = screenWidth < 500 ? screenWidth / 3 : screenWidth / 4;
  const y = (screenHeight / 3) * 2 - radius * 0.6;

  const sunRiseFallSpeed = 4000;
  const sunImage: React.MutableRefObject<GroupType | null> = useRef(null);
  useEffect(() => {
    if (sunImage.current) {
      sunImage.current.cache();
    }
    const animation = new Animation((frame) => {
      if (sunImage.current && frame) {
        sunImage.current.offsetY(Math.sin(frame.time / sunRiseFallSpeed) * 45);
      }
    });
    animation.start();

    return () => {
      animation.stop();
    };
  }, [sunImage.current]);

  const getLineStop = (n: number) => {
    return (radius / 10) * 2 * n;
  };
  const lines = [0, 1, 2, 3, 4];

  const lineWidth = radius / 10;
  const lineXLeft = x - (radius + 10);
  const lineXRight = x + (radius + 10);

  return (
    <Group ref={sunImage} width={radius * 4 + 10} height={radius * 4 + 10}>
      <Circle
        radius={radius}
        fillLinearGradientStartPoint={{ x: 0, y: -screenHeight / 8 }}
        fillLinearGradientEndPoint={{ x: 0, y: screenHeight / 8 }}
        fillLinearGradientColorStops={[0, "yellow", 1, "#db00d4"]}
        x={x}
        y={y}
      />
      {lines.map((i) => {
        return (
          <Line
            key={i}
            points={[
              lineXLeft,
              y + getLineStop(i),
              lineXRight,
              y + getLineStop(i),
              lineXRight,
              y + getLineStop(i) + lineWidth,
              lineXLeft,
              y + getLineStop(i) + lineWidth,
            ]}
            fill={"black"}
            closed={true}
            globalCompositeOperation="destination-out"
          />
        );
      })}
    </Group>
  );
}
