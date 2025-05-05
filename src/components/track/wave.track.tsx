"use client";

import { useEffect, useRef, useMemo } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { useSearchParams } from "next/navigation";
import "./wave.scss";
import { Tooltip } from "@mui/material";

const WaveTrack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef<HTMLDivElement>(null);
    const durationRef = useRef<HTMLDivElement>(null);
    const hoverRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const audio = searchParams.get("audio") || "/default-audio.mp3";

    // Memoize cấu hình Wavesurfer
    const wavesurferConfig = useMemo(
        () => ({
            container: containerRef,
            url: `/api?audio=${audio}`,
            waveColor: "#4A4A4A", // Tĩnh hóa màu waveform
            progressColor: "#FF6200", // Tĩnh hóa màu progress
            cursorColor: "#FF6200",
            barWidth: 2,
            barGap: 1,
            height: 80,
            barRadius: 1,
        }),
        [audio]
    );

    // Khởi tạo wavesurfer
    const { wavesurfer, isReady, isPlaying } = useWavesurfer(wavesurferConfig);

    // Xử lý sự kiện play/pause
    const onPlayPause = () => {
        if (wavesurfer) {
            wavesurfer.playPause();
        }
    };

    // Định dạng thời gian
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secondsRemainder = Math.round(seconds) % 60;
        return `${minutes}:${secondsRemainder.toString().padStart(2, "0")}`;
    };

    // Xử lý sự kiện wavesurfer và hover
    useEffect(() => {
        if (
            !wavesurfer ||
            !containerRef.current ||
            !timeRef.current ||
            !durationRef.current
        )
            return;

        // Debounce pointermove
        let timeout: NodeJS.Timeout;
        const handlePointerMove = (e: PointerEvent) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (hoverRef.current) {
                    hoverRef.current.style.width = `${e.offsetX}px`;
                }
            }, 16); // ~60fps
        };

        containerRef.current.addEventListener("pointermove", handlePointerMove);

        // Cập nhật thời gian và duration
        const onDecode = (duration: number) => {
            if (durationRef.current) {
                durationRef.current.textContent = formatTime(duration);
            }
        };
        const onTimeUpdate = (currentTime: number) => {
            if (timeRef.current) {
                timeRef.current.textContent = formatTime(currentTime);
            }
        };

        wavesurfer.on("decode", onDecode);
        wavesurfer.on("timeupdate", onTimeUpdate);

        // Cleanup
        return () => {
            containerRef.current?.removeEventListener(
                "pointermove",
                handlePointerMove
            );
            wavesurfer.un("decode", onDecode);
            wavesurfer.un("timeupdate", onTimeUpdate);
            clearTimeout(timeout);
        };
    }, [wavesurfer]);
    const arrComments = [
        {
            id: 1,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 10,
            user: "username 1",
            content: "just a comment1",
        },
        {
            id: 2,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 30,
            user: "username 2",
            content: "just a comment3",
        },
        {
            id: 3,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 50,
            user: "username 3",
            content: "just a comment3",
        },
    ];

    const calLeft = (moment: number) => {
        const hardCodeDuration = 199;
        const percent = (moment / hardCodeDuration) * 100;
        return `${percent}%`;
    };
    return (
        <div className="wave-container" style={{ marginTop: 20 }}>
            <div
                style={{
                    display: "flex",
                    gap: 15,
                    padding: 20,
                    height: 400,
                    background:
                        "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)",
                }}
            >
                <div
                    className="left"
                    style={{
                        width: "75%",
                        height: "calc(100% - 10px)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <div className="info" style={{ display: "flex" }}>
                        <div>
                            <button
                                onClick={onPlayPause}
                                className="play-pause-button"
                                style={{
                                    borderRadius: "50%",
                                    background: "#f50",
                                    height: "50px",
                                    width: "50px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                }}
                            >
                                {isPlaying ? "Pause" : "Play"}
                            </button>
                        </div>
                        <div style={{ marginLeft: 20 }}>
                            <div
                                style={{
                                    padding: "0 5px",
                                    background: "#333",
                                    fontSize: 30,
                                    width: "fit-content",
                                    color: "white",
                                }}
                            >
                                Hỏi Dân IT's song
                            </div>
                            <div
                                style={{
                                    padding: "0 5px",
                                    marginTop: 10,
                                    background: "#333",
                                    fontSize: 20,
                                    width: "fit-content",
                                    color: "white",
                                }}
                            >
                                Eric
                            </div>
                        </div>
                    </div>
                    <div ref={containerRef} id="waveform">
                        <div ref={timeRef} id="time">
                            0:00
                        </div>
                        <div ref={durationRef} id="duration">
                            0:00
                        </div>
                        <div ref={hoverRef} id="hover"></div>
                        <div
                            className="comments"
                            style={{ position: "relative" }}
                        >
                            {arrComments.map((item) => {
                                return (
                                    <Tooltip title={item.content} arrow>
                                        <img
                                            onPointerMove={(e) => {
                                                const hover = hoverRef.current!;
                                                hover.style.width = calLeft(
                                                    item.moment
                                                );
                                            }}
                                            key={item.id}
                                            style={{
                                                height: 20,
                                                width: 20,
                                                position: "absolute",
                                                top: 71,
                                                zIndex: 20,
                                                left: calLeft(item.moment),
                                            }}
                                            src={`http://localhost:8000/images/chill1.png`}
                                        />
                                    </Tooltip>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div
                    className="right"
                    style={{
                        width: "25%",
                        padding: 15,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            background: "#ccc",
                            width: 250,
                            height: 250,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default WaveTrack;
