import React, { useState } from 'react';
import { LayoutDashboard, Video, Lightbulb, MessageCircle, LogOut, Menu } from 'lucide-react';
import ManageEducationalVideos from './ManageEducationalVideos';
import ManageRecyclingTips from './ManageRecyclingTips';
import ManageFunFacts from './ManageFunFacts';
import AdminContacts from './AdminContacts';
import AdminOverview from "./AdminOverview";
import { useNavigate } from 'react-router-dom';

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg p-4 flex flex-col items-center md:items-start transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} md:w-64`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-6 md:hidden">
          <Menu className="w-6 h-6 text-gray-800" />
        </button>
        <h2 className={`text-2xl font-bold text-green-600 mb-6 transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          Admin Panel
        </h2>
        <nav className="space-y-5 w-full flex-grow">
          <SidebarItem icon={LayoutDashboard} label="Overview" active={activeSection === 'overview'} onClick={() => setActiveSection('overview')} />
          <SidebarItem icon={Video} label="Videos" active={activeSection === 'videos'} onClick={() => setActiveSection('videos')} />
          <SidebarItem icon={Lightbulb} label="Tips" active={activeSection === 'recycling-tips'} onClick={() => setActiveSection('recycling-tips')} />
          <SidebarItem icon={Lightbulb} label="Fun Facts" active={activeSection === 'fun-facts'} onClick={() => setActiveSection('fun-facts')} />
          <SidebarItem icon={MessageCircle} label="Contacts" active={activeSection === 'contacts'} onClick={() => setActiveSection('contacts')} />
        </nav>

        {/* Logout Button */}
        <button onClick={handleLogout} className="mt-auto flex items-center gap-4 text-lg text-red-600 hover:text-red-800 transition p-2 rounded-lg w-full">
          <LogOut className="w-6 h-6" />
          <span className={`${sidebarOpen ? 'block' : 'hidden'} md:block whitespace-nowrap truncate`}>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeSection === "overview" && <AdminOverview />}
        {activeSection === "videos" && <ManageEducationalVideos />}
        {activeSection === "recycling-tips" && <ManageRecyclingTips />}
        {activeSection === "fun-facts" && <ManageFunFacts />}
        {activeSection === "contacts" && <AdminContacts />}
      </main>
    </div>
  );
}

// Sidebar Item Component
const SidebarItem = ({ icon: Icon, label, active, onClick, sidebarOpen }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-4 text-lg text-gray-800 hover:text-green-600 transition p-2 rounded-lg w-full ${active ? 'bg-green-100' : ''}`}
  >
    <Icon className="w-6 h-6" />
    <span className={`transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'} md:block whitespace-nowrap truncate`}>
      {label}
    </span>
  </button>
);

export default AdminDashboard;
