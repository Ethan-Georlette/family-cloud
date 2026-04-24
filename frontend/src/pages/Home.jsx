import { useEffect, useState } from "react";
import { getProtectedUser } from "../api/auth";
import { getFiles } from "../api/file";

import PhotoSection from "../components/photo";
import VideoSection from "../components/videos";
import FilesSection from "../components/files";
import UploadPage from "../components/UploadTest";
import { getPhotos } from "../service/fileService";

export default function Home() {
    const [userData, setUserData] = useState(null);
    const [userPhotos, setUserPhotos] = useState(null);
    useEffect(() => {
        getFiles()
            .then((res) => {
                setUserData(res.data);
                setUserPhotos(getPhotos(res.data));
            })
            .catch((err) => console.error(err));
    }, []);
    console.log("User Data:", userData);
    console.log("User Photos:", userPhotos);
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
            <PhotoSection userPhotos={userPhotos} setUserPhotos={setUserPhotos} />
           
        </div>
    );
}