import AppHeader from "@/components/header/app.header";
import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequestJS } from "../components/utils/old.api";
import { sendRequest } from "@/components/utils/api";
export default async function HomePage() {
    //  đổi lại gợi ý code
    const res = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: "http://localhost:8000/api/v1/tracks/top",
        method: "POST",
        body: { category: "CHILL", limit: 1 },
    });
    console.log("res", res.data[0].title);
    return (
        <Container>
            <MainSlider />
            <MainSlider />
            <MainSlider />
        </Container>
    );
}
