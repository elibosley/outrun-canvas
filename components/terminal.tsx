import React, { useEffect, useState } from 'react';
import { Layer, Rect, Text } from 'react-konva';
import Cursor from './cursor';
import TerminalText from './terminal-text';

export default function Terminal({ screenWidth, screenHeight, clickHandler }) {
    const inputRef = React.useRef(null);

    useEffect(() => {
        if (inputRef && inputRef.current) {
            console.log(inputRef.current.addEventListener('click', () => {
                console.log('clicked')
                clickHandler(true)
            }))
        }
    })

    const setClicked = (event) => {
        console.log(event)
        clickHandler(true)
    }
    return (
        <Layer ref={inputRef} onClick={setClicked} onTap={setClicked}>
            <Rect x={0}
                y={0}
                width={screenWidth}
                height={screenHeight}
                fill={'black'} />
            <TerminalText
                width={screenWidth}
                height={screenHeight}
                x={20}
                y={screenHeight / 2.1}
                text={'Press any key to continue . . . . .'}
            />
        </Layer >
    );
}