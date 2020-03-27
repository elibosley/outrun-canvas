import React, { useEffect, useState, useRef } from 'react';
import { Layer, Rect, Text, Line, Group, Circle } from 'react-konva';
import Konva from 'konva';
import { Group as GroupType } from 'konva/types/Group';

export default function Sun({ screenWidth, screenHeight }) {
    const x = screenWidth / 2
    const y = screenHeight / 2
    const radius = screenWidth / 8
    const sunImage:React.MutableRefObject<GroupType> = useRef();
    useEffect(() => {
        if (sunImage) {
            sunImage.current.cache()
        }
    })
    return (
        <Group
            ref={sunImage}
            width={radius * 2 + 10}
            height={radius * 2 + 10}>
            <Circle
                radius={radius}
                fillLinearGradientStartPoint={{ x: 0, y: -screenHeight / 8 }}
                fillLinearGradientEndPoint={{ x: 0, y: screenHeight / 8 }}
                fillLinearGradientColorStops={[0, 'yellow', 1, '#db00d4']}
                x={screenWidth / 2}
                y={screenHeight / 2}
            />
            <Line
                points={[x - (radius + 5), y, x + (radius + 10), y, x + (radius + 10), y + 15, x - radius, y + 15]}
                fill={'black'}
                closed={true}
                globalCompositeOperation="destination-out"
            />
        </Group>
    );
}