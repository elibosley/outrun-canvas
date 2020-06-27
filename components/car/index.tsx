import React, { useEffect, useState, useRef } from 'react';
import { Layer, Rect, Text, Line, Group, Circle, Image, Transformer } from 'react-konva';
import { TABLET } from '../../helpers/types';
import useImage from 'use-image';
import { Image as ImageType } from 'konva/types/shapes/Image';
export default function Car({ screenWidth, screenHeight }) {
    const imageRef = useRef<ImageType>();
    const pathMaxWidth = screenWidth / 16;
    const imageWidth = 939 * 0.5;
    const imageHeight = 666 * 0.5;
    const y = screenHeight / 3 * 2;
    const [x, setX] = useState((screenWidth / 2) - (imageWidth / 2));
    const [addSubtract, setAddSubtract] = useState(2);
    const [image] = useImage('/car.svg');
    const startX = (screenWidth / 2) - (imageWidth / 2);
    const getNewX = () => {
        if (x > startX + pathMaxWidth && addSubtract === 2) {
            setAddSubtract(-2);
        }
        else if (x < startX - pathMaxWidth && addSubtract === -2) {
            setAddSubtract(2);
        }
        setX(x + addSubtract);
        console.log("x", x, 'startx', startX, 'pathmaxwidth', pathMaxWidth, 'addsub', addSubtract)
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            requestAnimationFrame(getNewX)
            imageRef.current.cache();
        }, 10)
        return () => clearTimeout(timeout)
    })
    return (
        <Image x={x} y={y} image={image} width={imageWidth} height={imageHeight} ref={imageRef} />
    );
}