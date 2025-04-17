"use client";

import WaveTrack from "@/components/track/wave.track";
import { useSearchParams } from "next/navigation";

const DetailTrackPage = (props: any) => {
    return (
        <div className="flex flex-col gap-4">
            <h1>Detail Track Page</h1>
            <p>This is the detail track page.</p>
            <WaveTrack />
        </div>
    );
};
export default DetailTrackPage;
