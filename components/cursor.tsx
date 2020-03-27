import React, { useEffect, useState } from 'react';
import { Layer, Rect, Text } from 'react-konva';

export default function Cursor({ x, y, fontSize, color }) {
    const [cursorColor, setCursorColor] = useState(color);

    const updateCursorColor = () => {
        if (cursorColor === 'black') {
            setCursorColor(color);
        } else {
            setCursorColor('black');
        }
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.requestAnimationFrame(updateCursorColor)
        }, 750)
        return () => { clearTimeout(timeout) }
    })
    return (
        <Rect x={x}
            y={y}
            width={fontSize / 2 || 8}
            height={fontSize || 16}
            fill={cursorColor}
            shadowBlur={15}
        />
    );
}