import React, { useEffect, useState } from "react";
import { FaUsers, FaExclamationTriangle, FaEnvelope } from "react-icons/fa";

function AdminOverview() {
    const [overview, setOverview] = useState({
        totalUsers: 0,
        totalReports: 0,
        totalContacts: 0
    });

    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/admin/overview");
                const data = await response.json();
                if (data.success) {
                    setOverview(data.overview);
                }
            } catch (error) {
                console.error("Error fetching admin overview:", error);
            }
        };

        const fetchReports = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/user/reports");
                const data = await response.json();
                if (data.success) {
                    setReports(data.reports);
                }
            } catch (error) {
                console.error("Error fetching waste reports:", error);
            }
        };

        fetchOverview();
        fetchReports();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="p-6 bg-blue-500 text-white rounded-lg shadow-md flex items-center gap-4">
                    <FaUsers className="text-3xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Users</h3>
                        <p className="text-3xl font-bold">{overview.totalUsers}</p>
                    </div>
                </div>
                <div className="p-6 bg-red-500 text-white rounded-lg shadow-md flex items-center gap-4">
                    <FaExclamationTriangle className="text-3xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Reports</h3>
                        <p className="text-3xl font-bold">{overview.totalReports}</p>
                    </div>
                </div>
                <div className="p-6 bg-green-500 text-white rounded-lg shadow-md flex items-center gap-4">
                    <FaEnvelope className="text-3xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Contacts</h3>
                        <p className="text-3xl font-bold">{overview.totalContacts}</p>
                    </div>
                </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Waste Reports</h3>
            <div className="overflow-auto max-h-[400px]  border rounded-lg p-4 bg-white shadow-lg">
                {reports.length > 0 ? (
                    reports.map((report, index) => (
                        <div key={index} className="mb-4 p-4 bg-gray-50 shadow-md rounded-lg hover:bg-gray-100 transition flex items-center gap-4">
                            {report.image && <img src={report.image} alt="Waste" className="w-40 h-40 object-cover rounded-md shadow" />}
                            <div>
                                <p className="font-semibold"><strong>Category:</strong> {report.category}</p>
                                <p><strong>Location:</strong> {report.location}</p>
                                <p><strong>Description:</strong> {report.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center">No waste reports available.</p>
                )}
            </div>
        </div>
    );
}

export default AdminOverview;
