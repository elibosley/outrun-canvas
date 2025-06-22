import React, { useEffect, useState, useRef } from 'react';
import { Layer, Rect, Text, Group } from 'react-konva';
import {Mountains} from './mountains';
import Sun from './sun';
import Ground from './ground/ground';
import Car from './car'
import CanvasOverlay from './canvas-overlay';

export default function MainScreen({ screenWidth, screenHeight } : { screenWidth: number, screenHeight: number }) {
    return (
      <Layer>
        <Rect
          x={0}
          y={0}
          width={screenWidth}
          height={screenHeight}
          fillLinearGradientStartPoint={{ x: screenWidth, y: 0 }}
          fillLinearGradientEndPoint={{ x: screenWidth, y: screenHeight }}
          fillLinearGradientColorStops={[0, "#311854", 1, "black"]}
        />
        {true && (
          <Mountains screenHeight={screenHeight} screenWidth={screenWidth} />
        )}
        <Sun screenHeight={screenHeight} screenWidth={screenWidth} />

        <Ground screenHeight={screenHeight} screenWidth={screenWidth} />
        <Car screenHeight={screenHeight} screenWidth={screenWidth} />
        
        <CanvasOverlay screenWidth={screenWidth} screenHeight={screenHeight} />
      </Layer>
    );
}
