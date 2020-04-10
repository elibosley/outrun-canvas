import { Group } from "react-konva";
import { useState, useRef, useEffect, MutableRefObject } from "react";
import { Line } from "react-konva";
import { Group as GroupType } from "konva/types/Group";
import { getRandomArbitrary } from "../../helpers/math";

interface IHorizontalGridLinesProps {
    screenWidth: number;
    screenHeight: number;
    x: number;
    y: number;
}

interface Line {

}

const HorizonalGridLines: React.FunctionComponent<IHorizontalGridLinesProps> = ({ screenWidth, screenHeight, x, y }) => {
    const groupRef: MutableRefObject<GroupType> = useRef();
    const [currentOffset, setOffset] = useState(0);
    /**
     * Returns y value given an x value
     * @param x 
     */
    const lineFunction = (x) => {
        return Math.pow(x, (0.05 * x)) + y // Add y at the end as the offset

    }

    const getLineAtY = (y): number[] => {
        return [0, y,
            screenWidth, y,
            screenWidth, y + 1,
            0, y + 1
        ]
    }

    const iterativeGenerator = (offset = 0) => {
        let points: number[][] = Array<Array<number>>()
        for (let x = 0 + offset; x < 40 + offset; x += 1 ) {
            points.push(getLineAtY(lineFunction(x)));
        }
        return points;
    }

    const [generatedLines, setGeneratedLines] = useState(iterativeGenerator())

    useEffect(() => {
        setGeneratedLines(iterativeGenerator())
    }, [screenWidth, screenHeight])


    const animateLines = () => {
        setGeneratedLines(iterativeGenerator(currentOffset))
        if (currentOffset >= 2) {
            setOffset(0)
        }
        else {
            setOffset(currentOffset + 0.1)
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            requestAnimationFrame(animateLines)
        }, 10)
        return () => { clearTimeout(timeout) }
    })
    return (
        <Group
            ref={groupRef}
        >
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
export default HorizonalGridLines