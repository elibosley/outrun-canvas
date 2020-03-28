import { Group } from "react-konva";
import { useState, useRef, useEffect, MutableRefObject } from "react";
import { Line } from "react-konva";
import { Group as GroupType } from "konva/types/Group";
import { getRandomArbitrary } from "../../helpers/math";

export default function HorizonalGridLines({ screenWidth, screenHeight, x, y }) {
    const groupRef: MutableRefObject<GroupType> = useRef();

    const generateHLinePoints = (scaleFactor = 0.3) => {
        const points = []
        let currHeight = y;
        let iterations = 1;
        do {
            points.push([
                0, currHeight,
                screenWidth, currHeight,
                screenWidth, currHeight + 1,
                0, currHeight + 1
            ])
            iterations += iterations * scaleFactor;
            currHeight += iterations
        } while (currHeight <= screenHeight)
        return points;
    }

    const [generatedLines, setGeneratedLines] = useState(generateHLinePoints())

    useEffect(() => {
        setGeneratedLines(generateHLinePoints())
    }, [screenWidth, screenHeight])

    
    const animateLines = () => {
        setGeneratedLines(generateHLinePoints(getRandomArbitrary(0.3, 0.4)))
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            requestAnimationFrame(animateLines)
        }, 1000)
        return () => { clearTimeout(timeout) }
    })
    return (
        <Group
            ref={groupRef}
        >
            {console.log('rendered')}
            {generatedLines.map((item, index) => {
                return (<Line
                    key={`hline_${index}`}
                    points={item}
                    fill={'#60b5d6'}
                    closed={true}
                />)
            })}

        </Group>
    )

}