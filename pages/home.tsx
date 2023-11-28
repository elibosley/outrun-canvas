import Terminal from "../components/terminal";
import { Stage } from "react-konva";
import React, { useEffect, useState } from "react";
import MainScreen from "../components/main-screen";
import Player from "../components/player";

export default function Home() {
  const [innerWidth, setInnerWidth] = useState(800);
  const [innerHeight, setInnerHeight] = useState(600);
  const [terminalClicked, setTerminalClicked] = useState(false);
  const resize = () => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);
  };
  useGlobalWindowResize(resize);

  useEffect(() => {
    resize();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Stage width={innerWidth} height={innerHeight}>
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
        {!terminalClicked && (
          <Terminal
            screenWidth={innerWidth}
            screenHeight={innerHeight}
            clickHandler={setTerminalClicked}
          />
        )}
        {terminalClicked && (
          <MainScreen screenWidth={innerWidth} screenHeight={innerHeight} />
        )}
      </Stage>
      <Player screenWidth={innerWidth} />
    </div>
  );
}

export const useWindowEvent = (event: string, callback: () => void) => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

export const useGlobalWindowResize = (callback: () => void) => {
  return useWindowEvent("resize", callback);
};
