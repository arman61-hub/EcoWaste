import React, { useState } from "react";
import { Upload, FileText, MapPin, ClipboardCheck, Send, FileImage, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export function ReportWaste() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    description: "",
  });

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  // Handle input change
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.category || !formData.location || !formData.description || !image) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("category", formData.category);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("image", image);

    try {
      const response = await fetch("http://localhost:4000/api/user/report", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Waste Report Submitted Successfully!");
        setFormData({ category: "", location: "", description: "" });
        setImage(null);
        setPreview(null);
      } else {
        toast.error(result.message || "Something went wrong. Try again!");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Error submitting the report. Please try again later.");
    } finally {
      setLoading(false); // ✅ Always reset loading state
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">🗑️ Report Waste Collection</h2>
      <p className="text-gray-600 text-center mb-4">Help us keep the environment clean by reporting waste in your area!</p>

      <div className="h-[500px] overflow-y-scroll p-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-green-600" /> Waste Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Category</option>
              <option value="Recyclable">Recyclable Waste</option>
              <option value="Organic">Organic Waste</option>
              <option value="Hazardous">Hazardous Waste</option>
              <option value="Electronic">Electronic Waste</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" /> Waste Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter location details"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" /> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the waste issue"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <Upload className="w-5 h-5 text-green-600" /> Upload Image
            </label>

            <div
              className={`border-2 border-dashed p-6 rounded-lg cursor-pointer transition-all 
              ${dragging ? "border-green-500 bg-green-100" : "border-gray-300 hover:border-green-500"}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Uploaded preview" className="w-full h-48 object-cover rounded-lg shadow-md" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center">
                  <FileImage className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-gray-600">Drag & drop or click to upload an image</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : <><Send className="w-5 h-5" /> Submit Report</>}
          </button>
        </form>
      </div>
    </div>
  );
}
