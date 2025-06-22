import React, { useRef, useState, useEffect } from 'react';
import { Group, Rect, Text } from 'react-konva';

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
        <Rect
          x={isNarrowScreen ? screenWidth / 2 - buttonWidth / 2 : screenWidth / 4 - buttonWidth / 2}
          y={isNarrowScreen ? 80 : 80}
          width={buttonWidth}
          height={buttonHeight}
          fill="rgba(0, 20, 40, 0.8)"
          stroke="#00ffff"
          strokeWidth={3}
          cornerRadius={8}
          shadowColor="#00ffff"
          shadowBlur={15}
          shadowOpacity={0.6}
          onClick={() => handleLinkClick("https://github.com/elibosley")}
        />
        <Rect
          x={isNarrowScreen ? screenWidth / 2 - buttonWidth / 2 + 3 : screenWidth / 4 - buttonWidth / 2 + 3}
          y={isNarrowScreen ? 83 : 83}
          width={buttonWidth - 6}
          height={buttonHeight - 6}
          fill="linear-gradient(90deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 128, 255, 0.1) 100%)"
          cornerRadius={6}
          onClick={() => handleLinkClick("https://github.com/elibosley")}
        />
        <Text
          x={isNarrowScreen ? screenWidth / 2 : screenWidth / 4}
          y={isNarrowScreen ? 95 : 95}
          text=">>> GITHUB <<<"
          fontSize={18}
          fill="#00ffff"
          fontFamily="Courier New, monospace"
          fontStyle="bold"
          align="center"
          verticalAlign="middle"
          offsetX={isNarrowScreen ? 75 : 80}
          shadowColor="#00ffff"
          shadowBlur={8}
          shadowOpacity={0.8}
          onClick={() => handleLinkClick("https://github.com/elibosley")}
        />

        {/* LinkedIn Button - Neon Pink */}
        <Rect
          x={isNarrowScreen ? screenWidth / 2 - buttonWidth / 2 : screenWidth / 2 - buttonWidth / 2}
          y={isNarrowScreen ? 140 : 80}
          width={buttonWidth}
          height={buttonHeight}
          fill="rgba(40, 0, 20, 0.8)"
          stroke="#ff00aa"
          strokeWidth={3}
          cornerRadius={8}
          shadowColor="#ff00aa"
          shadowBlur={15}
          shadowOpacity={0.6}
          onClick={() => handleLinkClick("https://www.linkedin.com/in/elijahbosley/")}
        />
        <Rect
          x={isNarrowScreen ? screenWidth / 2 - buttonWidth / 2 + 3 : screenWidth / 2 - buttonWidth / 2 + 3}
          y={isNarrowScreen ? 143 : 83}
          width={buttonWidth - 6}
          height={buttonHeight - 6}
          fill="linear-gradient(90deg, rgba(255, 0, 170, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)"
          cornerRadius={6}
          onClick={() => handleLinkClick("https://www.linkedin.com/in/elijahbosley/")}
        />
        <Text
          x={screenWidth / 2}
          y={isNarrowScreen ? 155 : 95}
          text=">>> LINKEDIN <<<"
          fontSize={18}
          fill="#ff00aa"
          fontFamily="Courier New, monospace"
          fontStyle="bold"
          align="center"
          verticalAlign="middle"
          offsetX={isNarrowScreen ? 85 : 90}
          shadowColor="#ff00aa"
          shadowBlur={8}
          shadowOpacity={0.8}
          onClick={() => handleLinkClick("https://www.linkedin.com/in/elijahbosley/")}
        />

        {/* Resume Button - Neon Purple */}
        <Rect
          x={isNarrowScreen ? screenWidth / 2 - buttonWidth / 2 : (3 * screenWidth) / 4 - buttonWidth / 2}
          y={isNarrowScreen ? 200 : 80}
          width={buttonWidth}
          height={buttonHeight}
          fill="rgba(20, 0, 40, 0.8)"
          stroke="#aa00ff"
          strokeWidth={3}
          cornerRadius={8}
          shadowColor="#aa00ff"
          shadowBlur={15}
          shadowOpacity={0.6}
          onClick={() => handleLinkClick("https://github.com/elibosley/Resume/blob/master/Elijah%20Bosley%20Resume.pdf")}
        />
        <Rect
          x={isNarrowScreen ? screenWidth / 2 - buttonWidth / 2 + 3 : (3 * screenWidth) / 4 - buttonWidth / 2 + 3}
          y={isNarrowScreen ? 203 : 83}
          width={buttonWidth - 6}
          height={buttonHeight - 6}
          fill="linear-gradient(90deg, rgba(170, 0, 255, 0.1) 0%, rgba(128, 0, 255, 0.1) 100%)"
          cornerRadius={6}
          onClick={() => handleLinkClick("https://github.com/elibosley/Resume/blob/master/Elijah%20Bosley%20Resume.pdf")}
        />
        <Text
          x={isNarrowScreen ? screenWidth / 2 : (3 * screenWidth) / 4}
          y={isNarrowScreen ? 215 : 95}
          text=">>> RESUME <<<"
          fontSize={18}
          fill="#aa00ff"
          fontFamily="Courier New, monospace"
          fontStyle="bold"
          align="center"
          verticalAlign="middle"
          offsetX={isNarrowScreen ? 75 : 80}
          shadowColor="#aa00ff"
          shadowBlur={8}
          shadowOpacity={0.8}
          onClick={() => handleLinkClick("https://github.com/elibosley/Resume/blob/master/Elijah%20Bosley%20Resume.pdf")}
        />
      </Group>
    </Group>
  );
} 