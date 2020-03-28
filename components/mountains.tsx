import React, { useEffect, useState } from 'react';
import { Layer, Rect, Text, Line, Group } from 'react-konva';

export default function Mountains({ screenWidth, screenHeight }) {
    const getRandomMountainHeight = () => {
        return ((Math.random() * screenHeight) * 0.3);
    }


    const generateRandomMountains = () => {

    }
    return (
        <Group>
            <Line
                points={[0, 0, screenWidth, screenHeight, screenWidth, 0]}
                strokeWidth={10}
                fill={''}
                closed={true}

                />
        </Group>
    );
}