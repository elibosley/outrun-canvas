import React, { useEffect, useState, useRef } from 'react';
import { Layer, Rect, Text, Line, Group, Circle } from 'react-konva';
import Konva from 'konva';
import { Group as GroupType } from 'konva/types/Group';

export default function Sun({ screenWidth, screenHeight }) {
    
    const x = screenWidth / 2
    
    const radius = screenWidth / 8
    const y = (screenHeight / 3) * 2 - (radius * 0.75)
    const sunImage: React.MutableRefObject<GroupType> = useRef();
    useEffect(() => {
        if (sunImage) {
            sunImage.current.cache()
        }
    })

    const getLineStop = (n: number) => {
        return (radius / 10) * 2 * n;
    }
    const lines = [0, 1, 2, 3, 4]

    const lineWidth = radius / 10;
    const lineXLeft = x - (radius + 10);
    const lineXRight = x + (radius + 10);
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
                x={x}
                y={y}
            />
            {lines.map(i => {
                return (
                    <Line
                        key={i}
                        points={[
                            lineXLeft, y + getLineStop(i),
                            lineXRight, y + getLineStop(i),
                            lineXRight, y + getLineStop(i) + lineWidth,
                            lineXLeft, y + getLineStop(i) + lineWidth
                        ]}
                        fill={'black'}
                        closed={true}
                        globalCompositeOperation="destination-out"
                    />
                )
            })}
        </Group>
    );
}