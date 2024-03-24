import React, { useRef, useEffect, useState } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import { useAudio, useBeforeUnload } from "react-use";

export const Player: React.FC = () => {
  const [audio, state, controls, audioRef] = useAudio({
    src: "/music/Synthwave_E.mp3",
    autoPlay: true,
  });
  return (
    <div className="w-full bg-gray-900 bg-opacity-20 z-50 flex">
      <button
        className="button p-4 hover:bg-slate-900 transition-all text-white w-full flex items-center gap-4 tracking-widest uppercase"
        aria-label={state.playing ? "Pause Music" : "Play Music"}
        onClick={() => (state.playing ? controls.pause() : controls.play())}
      >
        {state.playing ? (
          <PauseIcon className="w-4 h-4" />
        ) : (
          <PlayIcon className="w-4 h-4" />
        )}

        {state.playing ? "Pause Music" : "Play Music"}
        {audio}
      </button>
    </div>
  );
};
