import React, { useState, useEffect, useContext } from "react";
import { PlayCircle } from "lucide-react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const EducationalVideos = () => {
    const [videos, setVideos] = useState([]);
    const { backendUrl } = useContext(AppContext);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/admin/videos`);
            if (res.data.success) {
                setVideos(res.data.videos);
            } else {
                toast.error(res.data.message || "Unexpected API response format");
            }
        } catch (err) {
            toast.error(`Error fetching videos: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-red-700 mb-4 text-center">🎥 Educational Videos</h2>
            <p className="text-gray-600 text-center mb-6">Learn more about recycling and sustainability.</p>

            {/* Scrollable video section */}
            <div className="max-h-[500px] overflow-y-auto space-y-6 p-2 border border-gray-300 rounded-lg">
                {videos.length === 0 ? (
                    <p className="text-gray-500 text-center">No educational videos available.</p>
                ) : (
                    videos.map((video) => (
                        <div key={video._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <PlayCircle className="w-6 h-6 text-red-600" /> {video.title}
                            </h3>
                            <div className="mt-3">
                                <iframe
                                    className="w-full h-60 rounded-lg shadow-lg"
                                    src={video.url}
                                    title={video.title}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EducationalVideos;
