"use client"; // Đánh dấu component chạy trên client

import { useEffect, useMemo, useRef, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { useSearchParams } from "next/navigation";
import "./wave.scss";

const WaveTrack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const timeRef = useRef<HTMLDivElement>(null);
    const durationRef = useRef<HTMLDivElement>(null);
    const hoverRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const audio = searchParams.get("audio") || "/default-audio.mp3"; // Giá trị mặc định nếu audio là null

    // State để lưu gradient
    const [waveGradient, setWaveGradient] = useState<CanvasGradient | null>(
        null
    );
    const [progressGradient, setProgressGradient] =
        useState<CanvasGradient | null>(null);

    // Tạo gradient trong useEffect
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d")!;

            // Định nghĩa waveform gradient
            const gradient = ctx.createLinearGradient(
                0,
                0,
                0,
                canvas.height * 1.35
            );
            gradient.addColorStop(0, "#656666");
            gradient.addColorStop(
                (canvas.height * 0.7) / canvas.height,
                "#656666"
            );
            gradient.addColorStop(
                (canvas.height * 0.7 + 1) / canvas.height,
                "#ffffff"
            );
            gradient.addColorStop(
                (canvas.height * 0.7 + 2) / canvas.height,
                "#ffffff"
            );
            gradient.addColorStop(
                (canvas.height * 0.7 + 3) / canvas.height,
                "#B1B1B1"
            );
            gradient.addColorStop(1, "#B1B1B1");

            // Định nghĩa progress gradient
            const progress = ctx.createLinearGradient(
                0,
                0,
                0,
                canvas.height * 1.35
            );
            progress.addColorStop(0, "#EE772F");
            progress.addColorStop(
                (canvas.height * 0.7) / canvas.height,
                "#EB4926"
            );
            progress.addColorStop(
                (canvas.height * 0.7 + 1) / canvas.height,
                "#ffffff"
            );
            progress.addColorStop(
                (canvas.height * 0.7 + 2) / canvas.height,
                "#ffffff"
            );
            progress.addColorStop(
                (canvas.height * 0.7 + 3) / canvas.height,
                "#F6B094"
            );
            progress.addColorStop(1, "#F6B094");

            setWaveGradient(gradient);
            setProgressGradient(progress);
        }
    }, []);

    // Khởi tạo wavesurfer
    const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
        container: containerRef,
        url: `/api?audio=${audio}`,
        waveColor: waveGradient || "#656666", // Giá trị dự phòng
        progressColor: progressGradient || "#EE772F", // Giá trị dự phòng
        cursorColor: "#EE772F",
        barWidth: 2,
        height: 100,
    });

    // Xử lý sự kiện play/pause
    const onPlayPause = () => {
        wavesurfer && wavesurfer.playPause();
    };

    // Định dạng thời gian
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secondsRemainder = Math.round(seconds) % 60;
        const paddedSeconds = `0${secondsRemainder}`.slice(-2);
        return `${minutes}:${paddedSeconds}`;
    };

    // Xử lý sự kiện wavesurfer và hover
    useEffect(() => {
        if (
            !wavesurfer ||
            !containerRef.current ||
            !timeRef.current ||
            !durationRef.current ||
            !hoverRef.current
        )
            return;

        // Xử lý hover effect
        const handlePointerMove = (e: PointerEvent) => {
            if (hoverRef.current) {
                hoverRef.current.style.width = `${e.offsetX}px`;
            }
        };

        containerRef.current.addEventListener("pointermove", handlePointerMove);

        // Cập nhật thời gian và duration
        wavesurfer.on("decode", (duration) => {
            if (durationRef.current) {
                durationRef.current.textContent = formatTime(duration);
            }
        });
        wavesurfer.on("timeupdate", (currentTime) => {
            if (timeRef.current) {
                timeRef.current.textContent = formatTime(currentTime);
            }
        });

        // Cleanup sự kiện khi component unmount
        return () => {
            containerRef.current?.removeEventListener(
                "pointermove",
                handlePointerMove
            );
        };
    }, [wavesurfer]);

    return (
        <>
            <div ref={containerRef} id="waveform">
                <div ref={timeRef} id="time">
                    0:00
                </div>
                <div ref={durationRef} id="duration">
                    0:00
                </div>
                <div ref={hoverRef} id="hover"></div>
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }} />{" "}
            {/* Canvas ẩn để tạo gradient */}
            <button onClick={onPlayPause}>
                {isPlaying ? "Pause" : "Play"}
            </button>
        </>
    );
};

export default WaveTrack;
