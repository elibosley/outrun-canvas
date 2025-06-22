import { Group } from "react-konva";
import { useState, useRef, useEffect, MutableRefObject } from "react";
import { Line } from "react-konva";
import { Group as GroupType } from "konva/lib/Group";
import { Animation } from "konva/lib/Animation";

interface IHorizontalGridLinesProps {
  screenWidth: number;
  screenHeight: number;
  x: number;
  y: number;
}

const HorizonalGridLines: React.FunctionComponent<
  IHorizontalGridLinesProps
> = ({ screenWidth, screenHeight, x, y }) => {
  const groupRef: MutableRefObject<GroupType | null> = useRef(null);

  /**
   * Returns y value given an x value
   * @param x
   */
  const lineFunction = (x: number): number => {
    return Math.pow(x, 0.05 * x) + y; // Add y at the end as the offset
  };

  const getLineAtY = (y: number): number[] => {
    return [0, y, screenWidth, y];
  };

  const iterativeGenerator = (offset = 0) => {
    let points: number[][] = Array<Array<number>>();
    for (let x = 0 + offset; x < 40 + offset; x += 1) {
      points.push(getLineAtY(lineFunction(x)));
    }
    return points;
  };

  const [generatedLines] = useState(iterativeGenerator());

  useEffect(() => {
    if (!groupRef.current) return;

    const anim = new Animation((frame) => {
      if (frame && groupRef.current) {
        // Calculate smooth offset based on time
        const offset = (frame.time * 0.003) % 2; // Faster smooth continuous animation
        
        // Update each line's points directly without React state updates
        groupRef.current.children.forEach((lineNode, index) => {
          const line = lineNode as any; // Konva Line
          const newY = lineFunction(index + offset);
          line.points([0, newY, screenWidth, newY]);
        });
      }
    }, groupRef.current.getLayer());

    anim.start();
    
    return () => {
      anim.stop();
    };
  }, [screenWidth, screenHeight, y]);

  return (
    <Group ref={groupRef}>
      {generatedLines.map((item, index) => {
        return (
          <Line
            key={`hline_${index}`}
            points={item}
            strokeWidth={2}
            stroke={"#60b5d6"}
            closed={true}
          />
        );
      })}
    </Group>
  );
};
export default HorizonalGridLines;
