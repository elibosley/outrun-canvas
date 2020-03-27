import Terminal from "../components/terminal";
import { Layer, Stage } from "react-konva";
import React, { useEffect, useRef, useState } from 'react'
import { useStrictMode } from 'react-konva';
import MainScreen from "../components/main-screen";

useStrictMode(true);
export default function Index() {
  const [innerWidth, setInnerWidth] = useState(800);
  const [innerHeight, setInnerHeight] = useState(600);
  const [terminalClicked, setTerminalClicked] = useState(false);
  const resize = () => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth)
  }
  useGlobalWindowResize(resize);

  useEffect(() => {
    resize()
  }, []);

  return (
    <Stage width={innerWidth} height={innerHeight}>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      {!terminalClicked && false &&
      (<Terminal screenWidth={innerWidth} screenHeight={innerHeight} clickHandler={setTerminalClicked}/>)
      }
      {!terminalClicked && (
        <MainScreen screenWidth={innerWidth} screenHeight={innerHeight} />
      )}
      
    </Stage>
  );
}

export const useWindowEvent = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

export const useGlobalWindowResize = (callback) => {
  return useWindowEvent('resize', callback);
}