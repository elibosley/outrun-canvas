import Terminal from "../components/terminal";
import { Stage } from "react-konva";
import React, { useEffect, useState } from "react";
import MainScreen from "../components/main-screen";
import useWindowSize from "react-use/lib/useWindowSize";

export default function Home() {
  const [terminalClicked, setTerminalClicked] = useState(false);
  const { width, height } = useWindowSize();

  return (
    <div className="relative">
      <Stage width={width} height={height}>
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
        {!terminalClicked && (
          <Terminal
            screenWidth={width}
            screenHeight={height}
            clickHandler={setTerminalClicked}
          />
        )}
        {terminalClicked && (
          <MainScreen screenWidth={width} screenHeight={height} />
        )}
      </Stage>

    </div>
  );
}
