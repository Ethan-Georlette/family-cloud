const videoItems = [
    { title: "Summer Recap", meta: "8m 34s" },
    { title: "Graduation Day", meta: "14m 12s" },
    { title: "Road Trip", meta: "6m 08s" },
    { title: "Baby Steps", meta: "3m 41s" }
];

export default function VideoSection() {
    return (
        <section className="media-row">
            <div className="media-row-head">
                <h2>Videos</h2>
            </div>

            <div className="media-grid">
                {videoItems.map((item) => (
                    <article key={item.title} className="media-card media-card-video">
                        <div className="media-card-sheen" />
                        <h3>{item.title}</h3>
                        <p>{item.meta}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
