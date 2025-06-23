import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Plus, Lightbulb } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ManageRecyclingTips = () => {
  const [tips, setTips] = useState([]); 
  const [tip, setTip] = useState("");
  const { aToken, backendUrl } = useContext(AppContext);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/admin/tips`, {
        headers: { Authorization: `Bearer ${aToken}` }
      });
      if (res.data?.success) {
        setTips(res.data.tips || []);
      } else {
        toast.error(res.data?.message || "Unexpected API response format");
      }
    } catch (err) {
      toast.error(`Error fetching tips: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleAddTip = async (e) => {
    e.preventDefault();
    if (!tip.trim()) {
      toast.warning("Please enter a recycling tip");
      return;
    }
    try {
      const res = await axios.post(
        `${backendUrl}/api/admin/add-tip`,
        { tip },
        { headers: { Authorization: `Bearer ${aToken}` } }
      );
      if (res.data?.success) {
        toast.success(res.data.message || "Recycling tip added successfully!");
        setTip("");
        fetchTips();
      } else {
        toast.error(res.data?.message || "Failed to add recycling tip");
      }
    } catch (err) {
      toast.error(`Error adding tip: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">♻️ Manage Recycling Tips</h2>
      <p className="text-gray-600 text-center mb-4">Add and view helpful recycling tips here!</p>

      {/* Tip Input */}
      <form onSubmit={handleAddTip} className="flex flex-col gap-4 bg-green-50 p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          placeholder="Enter a recycling tip..."
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-all duration-300"
        >
          <Plus className="w-6 h-6" /> Add Tip
        </button>
      </form>

      {/* Recently Added Recycling Tips */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📌 Recently Added Recycling Tips</h3>

        {tips.length === 0 ? (
          <p className="text-gray-500 text-center">No recycling tips added yet.</p>
        ) : (
          <ul className="max-h-66 overflow-y-auto space-y-4 p-2 border border-green-300 rounded-lg bg-green-50 shadow-md">
            {tips.map((tip) => (
              <li key={tip._id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                <Lightbulb className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">{tip.tip}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageRecyclingTips;
