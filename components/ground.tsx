import React, { useEffect, useState } from 'react';
import { Layer, Rect, Text, Line, Group, Circle } from 'react-konva';

export default function Ground({ screenWidth, screenHeight }) {
    const x = screenWidth / 2
    const y = (screenHeight / 3) * 2
    return (
        <Group>
            <Rect
                x={0}
                y={y}
                width={screenWidth}
                height={screenHeight / 2}
                fill={'black'}
            />
        </Group>
    );
}