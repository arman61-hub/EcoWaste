import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Plus, Lightbulb } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ManageFunFacts = () => {
  const [funFacts, setFunFacts] = useState([]); 
  const [fact, setFact] = useState("");
  const { aToken, backendUrl } = useContext(AppContext);

  useEffect(() => {
    fetchFunFacts();
  }, []);

  const fetchFunFacts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/admin/funFacts`, {
        headers: { Authorization: `Bearer ${aToken}` }
      });
      if (res.data?.success) {
        setFunFacts(res.data.funFacts || []);
      } else {
        toast.error(res.data?.message || "Unexpected API response format");
      }
    } catch (err) {
      toast.error(`Error fetching fun facts: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleAddFunFact = async (e) => {
    e.preventDefault();
    if (!fact.trim()) {
      toast.warning("Please enter a fun fact");
      return;
    }
    try {
      const res = await axios.post(
        `${backendUrl}/api/admin/add-funFact`,
        { fact },
        { headers: { Authorization: `Bearer ${aToken}` } }
      );
      if (res.data?.success) {
        toast.success(res.data.message || "Fun fact added successfully!");
        setFact("");
        fetchFunFacts();
      } else {
        toast.error(res.data?.message || "Failed to add fun fact");
      }
    } catch (err) {
      toast.error(`Error adding fun fact: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">🎉 Manage Fun Facts</h2>
      <p className="text-gray-600 text-center mb-4">Add and view interesting recycling facts here!</p>

      {/* Fun Fact Input */}
      <form onSubmit={handleAddFunFact} className="flex flex-col gap-4 bg-blue-50 p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={fact}
          onChange={(e) => setFact(e.target.value)}
          placeholder="Enter a fun fact..."
          className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-300"
        >
          <Plus className="w-6 h-6" /> Add Fun Fact
        </button>
      </form>

      {/* Recently Added Fun Facts */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📌 Recently Added Fun Facts</h3>

        {funFacts.length === 0 ? (
          <p className="text-gray-500 text-center">No fun facts added yet.</p>
        ) : (
          <ul className="max-h-66 overflow-y-auto space-y-4 p-2 border border-blue-300 rounded-lg bg-blue-50 shadow-md">
            {funFacts.map((funfact) => (
              <li key={funfact._id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                <Lightbulb className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">{funfact.fact}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageFunFacts;
