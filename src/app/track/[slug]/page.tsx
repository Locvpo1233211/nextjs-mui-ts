const DetailTrackPage = (props: any) => {
    console.log("DetailTrackPage", props.params.slug);
    return (
        <div className="flex flex-col gap-4">
            <h1>Detail Track Page</h1>
            <p>This is the detail track page.</p>
        </div>
    );
};
export default DetailTrackPage;
