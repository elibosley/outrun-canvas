import React, { useEffect, useState } from 'react';
import { Layer, Rect, Text, Group } from 'react-konva';
import Cursor from './cursor';
export default function TerminalText({ width, height, x, y, text }) {
    const [currentlyTyped, setCurrentlyTyped] = useState("");
    const [index, setIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState(0);
    const textRef: React.MutableRefObject<any> = React.useRef();

    const typeNextLetter = () => {
        setCurrentlyTyped(`${currentlyTyped}${text[index]}`)
        setIndex(index + 1)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentlyTyped === text) {
                clearTimeout(timeout)
            } else {
                requestAnimationFrame(typeNextLetter)
            }
        }, 100)
        return () => { clearTimeout(timeout) }
    })

    useEffect(() => {
        setCursorPosition(textRef.current.getTextWidth() + getFont(20));
        textRef.current.cache()
    }, [currentlyTyped, width])

    const getFont = (size: number): number => {
        var ratio = size / 800;   // calc ratio
        var size = width * ratio;   // get font size based on current width
        return (size | 0); // set font
    }

    return (
        <Group>
            <Text
                ref={textRef}
                x={x}
                y={y}
                text={currentlyTyped}
                fontSize={getFont(20)}
                fontFamily={`'Anonymous Pro', monospace`}
                fill={'white'}
                shadowBlur={100} />
            <Cursor
             x={cursorPosition}
             y={y} 
             fontSize={getFont(20)}
             color={'white'} />
        </Group>
    );
}
