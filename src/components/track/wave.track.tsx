"use client";
import { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { useRef } from "react";

const WaveTrack = () => {
    const conRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const getElement = document.getElementById("hoidanit");
        if (conRef.current) {
            WaveSurfer.create({
                container: conRef.current,
                waveColor: "rgb(200, 0, 200)",
                progressColor: "rgb(100, 0, 100)",
                url: "/audio/hoidanit.mp3",
            });
        }
    }, []);
    return <div ref={conRef}>aaaaa</div>;
};
export default WaveTrack;
