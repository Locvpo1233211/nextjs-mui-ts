"use client";
import { useRef } from "react";

import WaveTrack from "@/components/track/wave.track";
import { useSearchParams } from "next/navigation";

const DetailTrackPage = (props: any) => {
    console.log("DetailTrackPage", props.params.slug);
    const searchParams = useSearchParams();

    const search = searchParams.get("audio");

    return (
        <div className="flex flex-col gap-4">
            <h1>Detail Track Page</h1>
            <p>This is the detail track page.</p>
            <WaveTrack />
        </div>
    );
};
export default DetailTrackPage;
