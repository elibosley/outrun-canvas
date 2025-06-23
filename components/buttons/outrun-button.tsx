import React from 'react';
import { Group, Rect, Text } from 'react-konva';

interface OutrunButtonProps {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  buttonId: string;
  colors: {
    stroke: string;
    fill: string;
    textBase: string;
    textHover: string;
    gradientBase: string;
    gradientHover: string;
  };
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export default function OutrunButton({ 
  x, 
  y, 
  width,
  height,
  text, 
  buttonId, 
  colors, 
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick 
}: OutrunButtonProps) {
  // Handle touch events for mobile
  const handleTouchStart = () => {
    onMouseEnter(); // Simulate hover on touch
  };

  const handleTouchEnd = () => {
    onMouseLeave(); // Remove hover on touch end
  };

  const handleTap = () => {
    onClick(); // Handle tap as click
  };

  return (
    <Group>
      {/* Outer Rectangle */}
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={isHovered ? colors.fill.replace('0.8', '0.9') : colors.fill}
        stroke={colors.stroke}
        strokeWidth={isHovered ? 4 : 3}
        cornerRadius={8}
        shadowColor={colors.stroke}
        shadowBlur={isHovered ? 25 : 15}
        shadowOpacity={isHovered ? 0.9 : 0.6}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTap={handleTap}
      />
      {/* Inner Rectangle */}
      <Rect
        x={x + 3}
        y={y + 3}
        width={width - 6}
        height={height - 6}
        fill={isHovered ? colors.gradientHover : colors.gradientBase}
        cornerRadius={6}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTap={handleTap}
      />
      {/* Text */}
      <Text
        x={x + width / 2}
        y={y + 15}
        text={text}
        fontSize={18}
        fill={isHovered ? colors.textHover : colors.textBase}
        fontFamily="Courier New, monospace"
        fontStyle="bold"
        align="center"
        verticalAlign="middle"
        offsetX={text.length * 5.5}
        shadowColor={colors.stroke}
        shadowBlur={isHovered ? 12 : 8}
        shadowOpacity={isHovered ? 1.0 : 0.8}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTap={handleTap}
      />
    </Group>
  );
} 