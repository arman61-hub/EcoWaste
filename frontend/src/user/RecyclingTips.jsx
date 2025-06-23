import React, { useState, useEffect, useContext } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const RecyclingTips = () => {
  const [tips, setTips] = useState([]);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/admin/tips`);
      if (res.data.success) {
        setTips(res.data.tips || []);
      } else {
        toast.error(res.data.message || "Unexpected API response format");
      }
    } catch (err) {
      toast.error(`Error fetching tips: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">♻️ Recycling Tips</h2>
      <p className="text-gray-600 text-center mb-6">Small changes lead to a cleaner environment!</p>

      {/* Scrollable tips section */}
      <ul className="max-h-[500px] overflow-y-auto space-y-4 p-2 border border-gray-300 rounded-lg">
        {tips.length === 0 ? (
          <p className="text-gray-500 text-center">No recycling tips available.</p>
        ) : (
          tips.map((tip) => (
            <li key={tip._id} className="flex items-center gap-3 p-3 bg-green-100 rounded-lg shadow-sm">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="text-gray-700">{tip.tip}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecyclingTips;
