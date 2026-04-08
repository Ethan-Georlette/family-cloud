
import PhotoSection from "../components/photo";
import VideoSection from "../components/videos";
import FilesSection from "../components/files";

export default function Home() {

    return (
        <div className="netflix-home">
            <section className="hero-banner">
                <div className="hero-overlay">
                    <p className="hero-kicker">Family Cloud Originals</p>
                    <h1>Stream Your Memories</h1>
                    <p>
                        Browse photos, videos, and files in one place with a cinematic layout.
                    </p>
                </div>
            </section>

            <div className="media-sections">
                <PhotoSection />
                <VideoSection />
                <FilesSection />
            </div>
        </div>
    );
}