import React, { useRef, useEffect } from 'react';

export default function Player({screenWidth}: { screenWidth: number}) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    useEffect(() => {
        if (audioRef && audioRef.current) audioRef.current.play()
    }, [audioRef])
    return (
        <div style={{'position': 'absolute', 'zIndex': '30', 'right': '10px', 'top': '10px' }}>
            <audio controls muted ref={audioRef}>
                <source src="/music/Synthwave_E.mp3"/>
                <source src="/music/Synthwave_E.mp3"/>
                <source src="/music/Synthwave_E.mp3"/>
            </audio>

        </div>
    )
}
