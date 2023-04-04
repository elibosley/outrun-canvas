import React, { useEffect, useState, useRef } from 'react';
import { Layer, Rect, Text } from 'react-konva';
import Mountains from './mountains';
import Sun from './sun';
import Ground from './ground/ground';
import Car from './car'
import HorizonalGridLines from './ground/hlines';
import { Layer as LayerType } from 'konva/types/Layer';

export default function MainScreen({ screenWidth, screenHeight }) {

    return (
        <Layer>
            <Rect x={0}
                y={0}
                width={screenWidth}
                height={screenHeight}
                fillLinearGradientStartPoint={{ x: screenWidth, y: 0 }}
                fillLinearGradientEndPoint={{ x: screenWidth, y: screenHeight }}
                fillLinearGradientColorStops={[0, '#311854', 1, 'black']}
                />
            {false && <Mountains screenHeight={screenHeight} screenWidth={screenWidth } />}
            <Text
                x={screenWidth * 0.33}
                y={screenHeight * 0.25}
                text={'Hi. - Learn more about me here: '}
                onPointerClick={() => { console.log('clicked'); window.location.assign('https://github.com') }}
                fontSize={20}
                
                fontFamily={`'Anonymous Pro', monospace`}
                fill={'white'}
                shadowBlur={100} />
            <Sun screenHeight={screenHeight} screenWidth={screenWidth }  />
            <Ground screenHeight={screenHeight} screenWidth={screenWidth} />
            <Mountains screenHeight={screenHeight} screenWidth={screenWidth} />
            <Car screenHeight={screenHeight} screenWidth={screenWidth} />
        </Layer>
    );
}
