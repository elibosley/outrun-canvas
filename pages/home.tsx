import Terminal from "../components/terminal";
import { Stage } from "react-konva";
import React, { useEffect, useState } from "react";
import MainScreen from "../components/main-screen";
import { Player } from "../components/player";
import { LinkButton } from "../components/buttons/linkButton";
import useWindowSize from "react-use/lib/useWindowSize";

export default function Home() {
  const [terminalClicked, setTerminalClicked] = useState(false);
  const { width, height } = useWindowSize();

  return (
    <div style={{ position: "relative" }}>
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
      {terminalClicked && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center z-50 align-top flex-col">
          <Player />
          <div className="flex items-center flex-grow-[1] justify-center">
            <div className="flex flex-col gap-2">
              <LinkButton text="GitHub" url="https://github.com/elibosley" />
              <LinkButton
                text="LinkedIn"
                url="https://www.linkedin.com/in/elijahbosley/"
              />
              <LinkButton
                text="Resume"
                url="https://github.com/elibosley/Resume/blob/master/Elijah%20Bosley%20Resume.pdf"
              />
            </div>
          </div>
          <div className="flex-grow-[2] flex-1" />
        </div>
      )}
    </div>
  );
}
