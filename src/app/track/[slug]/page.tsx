"use client";

import WaveTrack from "@/components/track/wave.track";
import { useSearchParams } from "next/navigation";
import { Container } from "@mui/material";
const DetailTrackPage = (props: any) => {
    return (
        <Container>
            <WaveTrack />
        </Container>
    );
};
export default DetailTrackPage;
