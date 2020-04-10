import React, { useEffect, useState, useRef } from 'react';
import { Layer, Rect, Text, Line, Group, Circle, Image, Transformer } from 'react-konva';
import { TABLET } from '../../helpers/types';
import useImage from 'use-image';
export default function Car({ screenWidth, screenHeight }) {
    const [image] = useImage('/car.svg')
    const imageWidth = 939 * 0.5;
    const imageHeight = 666 * 0.5;
    const y = screenHeight / 3 * 2.2
    return (

        <Image x={screenWidth / 2 - imageWidth / 2} y={y } image={image} width={imageWidth} height={imageHeight} />
    );
}