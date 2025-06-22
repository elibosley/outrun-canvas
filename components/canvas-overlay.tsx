import React, { useRef, useState, useEffect } from 'react';
import { Group, Rect, Text } from 'react-konva';
import OutrunButton from './buttons/outrun-button';

interface CanvasOverlayProps {
  screenWidth: number;
  screenHeight: number;
}

export default function CanvasOverlay({ screenWidth, screenHeight }: CanvasOverlayProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/music/Synthwave_E.mp3");
    audioRef.current.preload = "auto";
    
    const audio = audioRef.current;
    
    const handleCanPlay = () => setIsLoaded(true);
    const handleEnded = () => setIsPlaying(false);
    
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const handlePlayPause = async () => {
    if (!audioRef.current || !isLoaded) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };

  // Responsive layout logic
  const isNarrowScreen = screenWidth < 900;
  const buttonWidth = isNarrowScreen ? 200 : 220;
  const buttonHeight = 45;

  // Hover state management
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <Group>
      {/* Player Button */}
      <Group>
        <Rect
          x={0}
          y={0}
          width={screenWidth}
          height={60}
          fill="rgba(17, 24, 39, 0.2)"
          onClick={handlePlayPause}
        />
        <Text
          x={20}
          y={20}
          text={isPlaying ? "⏸ PAUSE MUSIC" : "▶ PLAY MUSIC"}
          fontSize={16}
          fill="white"
          fontFamily="Arial"
          letterSpacing={2}
          onClick={handlePlayPause}
        />
      </Group>

      {/* Link Buttons */}
      <Group>
        {/* GitHub Button - Neon Cyan */}
        <OutrunButton
          x={isNarrowScreen ? screenWidth / 2 - buttonWidth / 2 : screenWidth / 4 - buttonWidth / 2}
          y={isNarrowScreen ? 80 : 80}
          width={buttonWidth}
          height={buttonHeight}
          text=">>> GITHUB <<<"
          buttonId="github"
          isHovered={hoveredButton === 'github'}
          onMouseEnter={() => setHoveredButton('github')}
          onMouseLeave={() => setHoveredButton(null)}
          colors={{
            stroke: "#00ffff",
            fill: "rgba(0, 20, 40, 0.8)",
            textBase: "#00ffff",
            textHover: "#66ffff",
            gradientBase: "linear-gradient(90deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 128, 255, 0.1) 100%)",
            gradientHover: "linear-gradient(90deg, rgba(0, 255, 255, 0.2) 0%, rgba(0, 128, 255, 0.2) 100%)"
          }}
          onClick={() => handleLinkClick("https://github.com/elibosley")}
        />

        {/* LinkedIn Button - Neon Pink */}
        <OutrunButton
          x={isNarrowScreen ? screenWidth / 2 - buttonWidth / 2 : screenWidth / 2 - buttonWidth / 2}
          y={isNarrowScreen ? 140 : 80}
          width={buttonWidth}
          height={buttonHeight}
          text=">>> LINKEDIN <<<"
          buttonId="linkedin"
          isHovered={hoveredButton === 'linkedin'}
          onMouseEnter={() => setHoveredButton('linkedin')}
          onMouseLeave={() => setHoveredButton(null)}
          colors={{
            stroke: "#ff00aa",
            fill: "rgba(40, 0, 20, 0.8)",
            textBase: "#ff00aa",
            textHover: "#ff66cc",
            gradientBase: "linear-gradient(90deg, rgba(255, 0, 170, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)",
            gradientHover: "linear-gradient(90deg, rgba(255, 0, 170, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%)"
          }}
          onClick={() => handleLinkClick("https://www.linkedin.com/in/elijahbosley/")}
        />

        {/* Resume Button - Neon Purple */}
        <OutrunButton
          x={isNarrowScreen ? screenWidth / 2 - buttonWidth / 2 : (3 * screenWidth) / 4 - buttonWidth / 2}
          y={isNarrowScreen ? 200 : 80}
          width={buttonWidth}
          height={buttonHeight}
          text=">>> RESUME <<<"
          buttonId="resume"
          isHovered={hoveredButton === 'resume'}
          onMouseEnter={() => setHoveredButton('resume')}
          onMouseLeave={() => setHoveredButton(null)}
          colors={{
            stroke: "#aa00ff",
            fill: "rgba(20, 0, 40, 0.8)",
            textBase: "#aa00ff",
            textHover: "#cc66ff",
            gradientBase: "linear-gradient(90deg, rgba(170, 0, 255, 0.1) 0%, rgba(128, 0, 255, 0.1) 100%)",
            gradientHover: "linear-gradient(90deg, rgba(170, 0, 255, 0.2) 0%, rgba(128, 0, 255, 0.2) 100%)"
          }}
          onClick={() => handleLinkClick("https://github.com/elibosley/Resume/blob/master/Elijah%20Bosley%20Resume.pdf")}
        />
      </Group>
    </Group>
  );
} 