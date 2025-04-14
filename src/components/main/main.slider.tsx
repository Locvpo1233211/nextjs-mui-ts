"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Settings } from "react-slick";
import { Box, Button, Divider } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
interface IProps {
    data: ITrackTop[];
}
const MainSlider = (props: IProps) => {
    console.log("MainSlider", props.data[0].category);
    const data = props.data;
    const NextArrow = (props: any) => {
        return (
            <Button
                color="inherit"
                variant="contained"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35,
                }}
            >
                <ChevronRightIcon />
            </Button>
        );
    };

    const PrevArrow = (props: any) => {
        return (
            <Button
                color="inherit"
                variant="contained"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    top: "50%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35,
                }}
            >
                <ChevronLeftIcon />
            </Button>
        );
    };
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <Box
            sx={{
                margin: "0 50px",
                ".track": {
                    padding: "0 10px",
                },
                img: {
                    height: 150,
                    width: 150,
                },
                h3: {
                    border: "1px solid #ccc",
                    padding: "20px",
                    height: "200px",
                },
            }}
        >
            <h2>TOP {props.data[0].category} </h2>

            <Slider {...settings}>
                {data.map((track) => {
                    return (
                        <div className="track" key={track._id}>
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`}
                                alt="img DvD"
                            />
                            <Link href={`/track/${track._id}`}>
                                <h4>{track.title}</h4>
                            </Link>
                            <h5>{track.description}</h5>
                        </div>
                    );
                })}
            </Slider>
            <Divider />
        </Box>
    );
};

export default MainSlider;
