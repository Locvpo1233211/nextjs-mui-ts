"use client";
import { AppBar, Container, IconButton, styled, Toolbar } from "@mui/material";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { use } from "react";
import { useHasMounted } from "../utils/customHook";
const AppFooter = () => {
    const hasMounted = useHasMounted();
    if (!hasMounted) return <></>;
    console.log("AppFooter", process.env.NEXT_PUBLIC_API_URL);

    return (
        <AppBar
            position="fixed"
            sx={{
                top: "auto",
                bottom: 0,
                backgroundColor: "#fff",
            }}
        >
            <Container sx={{ display: "flex", gap: 10 }}>
                <AudioPlayer
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
                    volume={0.5}

                    // other props here
                />
                <div
                    style={{
                        display: "flex",
                        gap: 10,
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "center",
                        minWidth: 100,
                    }}
                >
                    <div style={{ color: "#ccc" }}>Ẻic</div>
                    <div style={{ color: "black" }}>Who am I?</div>
                </div>
            </Container>
        </AppBar>
    );
};

export default AppFooter;
