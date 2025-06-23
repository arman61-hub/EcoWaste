import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Plus, PlayCircle, Trash2 } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ManageEducationalVideos = () => {
    const [videos, setVideos] = useState([]);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const { aToken, backendUrl } = useContext(AppContext);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/admin/videos`, { headers: { aToken } });
            if (res.data.success) {
                setVideos(res.data.videos);
            } else {
                toast.error(res.data.message || "Unexpected API response format");
            }
        } catch (err) {
            toast.error(`Error fetching videos: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleAddVideo = async (e) => {
        e.preventDefault();
        if (!title || !url) {
            toast.warning("Please fill in all fields");
            return;
        }
        try {
            const res = await axios.post(`${backendUrl}/api/admin/add-video`, { title, url }, { headers: { aToken } });
            if (res.data.success) {
                toast.success(res.data.message);
                setTitle("");
                setUrl("");
                fetchVideos();
            } else {
                toast.error(res.data.message || "Failed to add video");
            }
        } catch (err) {
            toast.error(`Error adding video: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">📚 Manage Educational Videos</h2>
            <p className="text-gray-600 text-center mb-6">Add and manage educational videos for better learning.</p>
            
            {/* Video Upload Form */}
            <form onSubmit={handleAddVideo} className="flex flex-col gap-3 bg-gray-100 p-4 rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Enter video title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Video URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-700">
                    <Plus className="w-5 h-5" /> Add Video
                </button>
            </form>

            {/* Recently Added Videos */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">🎥 Recently Added Videos</h3>
                <div className="max-h-66 overflow-y-auto space-y-4 p-2 border border-gray-300 rounded-lg">
                    {videos.length === 0 ? (
                        <p className="text-gray-500 text-center">No videos added yet.</p>
                    ) : (
                        videos.map((video) => (
                            <div key={video._id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <PlayCircle className="w-6 h-6 text-red-600" /> {video.title}
                                </h3>
                                <iframe
                                    className="w-full h-60 rounded-lg shadow-lg mt-3"
                                    src={video.url}
                                    title={video.title}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageEducationalVideos;