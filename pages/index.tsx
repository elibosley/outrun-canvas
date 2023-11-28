import { useStrictMode } from 'react-konva';
import dynamic from "next/dynamic";

useStrictMode(true);

const NoSSRHome = dynamic(() => import('./home').then((mod) => mod.default), { ssr: false })

export default NoSSRHome