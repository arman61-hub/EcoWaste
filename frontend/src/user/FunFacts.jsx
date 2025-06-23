import React, { useState, useEffect, useContext } from "react";
import { Lightbulb } from "lucide-react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const FunFacts = () => {
  const [funFacts, setFunFacts] = useState([]);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    fetchFunFacts();
  }, []);

  const fetchFunFacts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/admin/funFacts`);
      if (res.data.success) {
        setFunFacts(res.data.funFacts || []);
      } else {
        toast.error(res.data.message || "Unexpected API response format");
      }
    } catch (err) {
      toast.error(`Error fetching fun facts: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">🌎 Fun Recycling Facts</h2>
      <p className="text-gray-600 text-center mb-6">Did you know? Recycling helps the planet in amazing ways!</p>

      {/* Scrollable fun facts section */}
      <ul className="max-h-[500px] overflow-y-auto space-y-4 p-2 border border-gray-300 rounded-lg">
        {funFacts.length === 0 ? (
          <p className="text-gray-500 text-center">No fun facts available.</p>
        ) : (
          funFacts.map((fact) => (
            <li key={fact._id} className="flex items-center gap-3 p-3 bg-blue-100 rounded-lg shadow-sm">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              <span className="text-gray-700">{fact.fact}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FunFacts;
