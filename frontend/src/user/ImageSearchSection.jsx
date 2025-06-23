import React, { useState, useEffect } from "react";
import { Upload, Search as SearchIcon, Loader, Trash2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const [prefix, data] = reader.result.split(",");
      const mimeType = prefix.split(":")[1].split(";")[0];
      resolve({ data, mimeType });
    };
    reader.onerror = (error) => reject(error);
  });
};

export function ImageSearchSection() {
  const [state, setState] = useState({
    image: null,
    preview: null,
    loading: false,
    result: null,
    error: null,
    isDragging: false,
  });

  useEffect(() => {
    return () => {
      if (state.preview) URL.revokeObjectURL(state.preview);
    };
  }, [state.preview]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prev) => ({ ...prev, isDragging: e.type === "dragover" }));
  };

  const handleImageChange = async (file) => {
    if (!file?.type?.startsWith("image/")) {
      setState((prev) => ({ ...prev, error: "Please upload a valid image file" }));
      return;
    }
    if (state.preview) URL.revokeObjectURL(state.preview);
    const preview = URL.createObjectURL(file);
    setState((prev) => ({
      ...prev,
      image: file,
      preview,
      error: null,
      result: null,
      isDragging: false,
    }));
  };

  const removeImage = () => {
    if (state.preview) URL.revokeObjectURL(state.preview);
    setState({ image: null, preview: null, result: null, error: null });
  };

  const analyzeImage = async () => {
    if (!state.image) return;
    setState((prev) => ({ ...prev, loading: true, error: null, result: null }));
    try {
      const { data: base64Image, mimeType } = await fileToBase64(state.image);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite-preview-06-17" });
      const prompt = `Identify the main object and provide recycling_info and other approaches. 
      Respond ONLY with valid JSON: { "object_detected": string, "recycling_info": string, "approaches": object(string) }`;
      const response = await model.generateContent([
        prompt,
        { inlineData: { data: base64Image, mimeType } },
      ]);
      const text = response.response.text();
      const cleanedText = text.replace(/^```json|```$/g, "").trim();
      const jsonResponse = JSON.parse(cleanedText);
      setState((prev) => ({
        ...prev,
        result: {
          objectName: jsonResponse.object_detected || "Unidentified object",
          recyclingInfo: jsonResponse.recycling_info || "No specific instructions available",
          approaches: jsonResponse.approaches || {},
        },
      }));
    } catch (error) {
      console.error("Analysis error:", error);
      setState((prev) => ({ ...prev, error: "Failed to analyze image. Please try again." }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">🔍 Identify & Recycle</h1>
      <p className="text-gray-600 mb-6">Upload an image to identify the object and get AI-powered recycling instructions.</p>
      <div
        className={`border-2 border-dashed p-6 rounded-lg transition-all duration-300 ${state.isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${state.loading ? "opacity-50 pointer-events-none" : ""}`}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={(e) => {
          handleDrag(e);
          handleImageChange(e.dataTransfer.files[0]);
        }}
      >
        {state.preview ? (
          <div className="relative">
            <img src={state.preview} alt="Uploaded preview" className="w-full h-48 object-cover rounded-lg shadow-md" />
            <button onClick={removeImage} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-gray-600 font-medium">Drag & drop or click to upload an image</span>
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e.target.files[0])} className="hidden" disabled={state.loading} />
          </label>
        )}
      </div>
      {state.error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">⚠ {state.error}</div>}
      {state.image && (
        <button onClick={analyzeImage} className="mt-4 m-auto bg-blue-600 text-white p-3  rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50">
          {state.loading ? <Loader className="w-5 h-5 animate-spin" /> : <SearchIcon className="w-5 h-5" />} Search & Analyze
        </button>
      )}
      {state.result && (
        <div className="max-h-45 overflow-y-auto mt-6 p-4 bg-gray-100 rounded-lg text-left shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">🔎 Identified: {state.result.objectName}</h2>
          <p className="text-gray-700">♻ Recycling Instructions: {state.result.recyclingInfo}</p>
          {state.result.approaches && Object.keys(state.result.approaches).length > 0 && (
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {Object.entries(state.result.approaches).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}