import React, { useEffect, useState, useRef } from 'react';
import { Layer, Rect, Text, Line, Group, Circle, Image, Transformer } from 'react-konva';
import { TABLET } from '../../helpers/types';
import useImage from 'use-image';
import { Image as ImageType } from 'konva/types/shapes/Image';
export default function Car({ screenWidth, screenHeight }: { screenWidth: number, screenHeight: number}) {
    const imageRef = useRef<ImageType | null>(null);
    const pathMaxWidth = screenWidth / 16;
    const percentageOfScreenMaxSize = Math.min(1280, screenWidth) / 1280 * 0.5
    const imageWidth = 939 * percentageOfScreenMaxSize;
    const imageHeight = 666 * percentageOfScreenMaxSize;
    const y = screenHeight - imageHeight;
    const [carMoveIncrement, setCarMoveIncrement] = useState(2)

    const [x, setX] = useState((screenWidth / 2) - (imageWidth / 2));
    const [addSubtract, setAddSubtract] = useState(2);
    const [image] = useImage('/car.svg');
    const startX = (screenWidth / 2) - (imageWidth / 2);
    const getNewX = () => {
        if (x > startX + pathMaxWidth && addSubtract === carMoveIncrement) {
            setAddSubtract(-carMoveIncrement);
        }
        else if (x < startX - pathMaxWidth && addSubtract === -carMoveIncrement) {
            setAddSubtract(carMoveIncrement);
        }
        setX(x + addSubtract);
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            requestAnimationFrame(getNewX)
            imageRef.current?.cache();
        }, 10)
        return () => clearTimeout(timeout)
    })
    return (
        <Image x={x} y={y} image={image} width={imageWidth} height={imageHeight} ref={imageRef} />
    );
}
