import { useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { useSearchParams } from "next/navigation";

const WaveTrack = () => {
    const containerRef = useRef(null);
    const searchParams = useSearchParams();

    const audio = searchParams.get("audio");
    const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
        container: containerRef,
        url: `/api?audio=${audio}`,
        waveColor: "purple",
        barWidth: 2,
        height: 100,
    });

    const onPlayPause = () => {
        wavesurfer && wavesurfer.playPause();
    };

    return (
        <>
            <div ref={containerRef} />

            <button onClick={onPlayPause}>
                {isPlaying ? "Pause" : "Play"}
            </button>
        </>
    );
};

export default WaveTrack;
