import { useEffect, useState } from "react";
import { getProtectedUser } from "../api/auth";
import { getFiles } from "../api/file";

import PhotoSection from "../components/photo";
import VideoSection from "../components/videos";
import FilesSection from "../components/files";
import UploadPage from "../components/UploadTest";

export default function Home() {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        getFiles()
            .then((res) => setUserData(res.data))
            .catch((err) => console.error(err));
    }, []);
    console.log("User Data:", userData);
    return (
        // <div className="netflix-home">
        //     <section className="hero-banner">
        //         <div className="hero-overlay">
        //             <p className="hero-kicker">Family Cloud Originals</p>
        //             <h1>Stream Your Memories</h1>
        //             <p>
        //                 Browse photos, videos, and files in one place with a cinematic layout.
        //             </p>
        //         </div>
        //     </section>
        //     <div className="media-sections">
        //         <PhotoSection />
        //         <VideoSection />
        //         <FilesSection />
        //     </div>
        // </div>
        <div>
            <UploadPage />
            <h1>Home</h1>
            {/* {userData && <img src={userData.url} alt="User File" style={{ width: "200px" }} />} */}
            {/* {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>} */}
        </div>
    );
}