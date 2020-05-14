import React, { useRef, useEffect } from 'react';

export default function Player({ screenWidth, screenHeight }) {
    const audioRef = useRef<HTMLAudioElement>();
    useEffect(() => {
        if (audioRef && audioRef.current) audioRef.current.play()
    }, [audioRef])
    return (
        <div >
            <style jsx>{`
                position: fixed;
                bottom: 25px;
                right: 25px;
                min-width: 200px;
                height: 100px;
            `}</style>
            <audio controls muted ref={audioRef}>
                <source src="/music/Synthwave_E.mp3"/>
                <source src="/music/Synthwave_E.mp3"/>
                <source src="/music/Synthwave_E.mp3"/>
            </audio>

        </div>
    )
}