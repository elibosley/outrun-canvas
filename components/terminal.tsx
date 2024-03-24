import React, { useEffect, useState } from "react";
import { Layer, Rect, Text } from "react-konva";
import { Layer as LayerType } from "konva/lib/Layer";
import Cursor from "./cursor";
import TerminalText from "./terminal-text";

export default function Terminal({
  screenWidth,
  screenHeight,
  clickHandler,
}: {
  screenWidth: number;
  screenHeight: number;
  clickHandler: (isClicked: boolean) => void;
}) {
  const inputRef = React.useRef<LayerType>(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.addEventListener("click", setClicked);
      inputRef.current.addEventListener("touchstart", setClicked);
    }
    return () => {
      inputRef.current?.removeEventListener("click");
      inputRef.current?.removeEventListener("touchstart");
    };
  }, [inputRef]);

  const setClicked = () => {
    clickHandler(true);
  };
  return (
    <Layer ref={inputRef}>
      <Rect
        x={0}
        y={0}
        width={screenWidth}
        height={screenHeight}
        fill={"black"}
      />
      <TerminalText
        width={screenWidth}
        height={screenHeight}
        x={20}
        y={screenHeight / 2.1}
        text={"Press any key to continue . . . . ."}
      />
    </Layer>
  );
}
