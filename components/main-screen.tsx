import React, { useEffect, useRef } from "react";
import { Layer, Rect, Text } from "react-konva";
import Mountains from "./mountains";
import Sun from "./sun";
import Ground from "./ground/ground";
import Car from "./car";
import ScrollingText from "./scrolling-text";
import { Layer as LayerType } from "konva/types/Layer";

export default function MainScreen({
  screenWidth,
  screenHeight,
}: {
  screenWidth: number;
  screenHeight: number;
}) {
  const layerRef = useRef<LayerType | null>(null);
  useEffect(() => {
    if (layerRef.current) {
      setTimeout(() => {
        layerRef.current?.addEventListener("click", (click) => {
          window.open("https://github.com/elibosley", "_blank");
        });
      }, 5000);
    }
  }, [layerRef]);
  return (
    <Layer ref={layerRef}>
      <Rect
        x={0}
        y={0}
        width={screenWidth}
        height={screenHeight}
        fillLinearGradientStartPoint={{ x: screenWidth, y: 0 }}
        fillLinearGradientEndPoint={{ x: screenWidth, y: screenHeight }}
        fillLinearGradientColorStops={[0, "#311854", 1, "black"]}
      />
      {false && (
        <Mountains screenHeight={screenHeight} screenWidth={screenWidth} />
      )}
      <ScrollingText screenHeight={screenHeight} screenWidth={screenWidth} />
      <Sun screenHeight={screenHeight} screenWidth={screenWidth} />
      <Ground screenHeight={screenHeight} screenWidth={screenWidth} />
      <Mountains screenHeight={screenHeight} screenWidth={screenWidth} />
      <Car screenHeight={screenHeight} screenWidth={screenWidth} />
    </Layer>
  );
}
