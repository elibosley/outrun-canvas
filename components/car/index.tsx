import React, { useEffect, useState, useRef } from 'react';
import { Layer, Rect, Text, Line, Group, Circle, Image, Transformer } from 'react-konva';
import { TABLET } from '../../helpers/types';
import useImage from 'use-image';
export default function Car({ screenWidth, screenHeight }) {
    
    const imageWidth = 939 * 0.5;
    const imageHeight = 666 * 0.5;
    const y = screenHeight / 3 * 2.2
    const [x, setX] = useState((screenWidth / 2) - (imageWidth / 2))
    const [image] = useImage('/car.svg')
    const getNewX = () => {
        setX(Math.round(Math.random()) * 2 - 1 + x)
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            requestAnimationFrame(getNewX)
        }, 10)
        return () => clearTimeout(timeout)
    })
    return (
        <Image x={x} y={y } image={image} width={imageWidth} height={imageHeight} />
    );
}