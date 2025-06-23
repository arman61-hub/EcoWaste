import React, { useEffect, useState } from "react";

function AdminContacts() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/contacts");
                const data = await response.json();
                if (data.success) {
                    setContacts(data.contacts);
                }
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Contact Messages</h2>
            {contacts.length > 0 ? (
                <div className="max-h-66 overflow-y-auto overflow-x-auto">
                    <table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-green-500 text-white">
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Subject</th>
                                <th className="p-3 text-left">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact, index) => (
                                <tr key={index} className="border-b hover:bg-green-100 transition">
                                    <td className="p-3 text-gray-800">{contact.name}</td>
                                    <td className="p-3 text-gray-600">{contact.email}</td>
                                    <td className="p-3 text-gray-800">{contact.subject}</td>
                                    <td className="p-3 text-gray-600">{contact.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No contact messages available.</p>
            )}
        </div>
    );
}

export default AdminContacts;