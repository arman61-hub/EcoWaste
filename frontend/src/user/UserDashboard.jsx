import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Image, Lightbulb, Video, Users, Menu, LogOut } from 'lucide-react';
import { ReportWaste } from './ReportWaste';
import { ImageSearchSection } from './ImageSearchSection';
import { CommunityEngagement } from './CommunityEngagement';
import  EducationalVideos  from './EducationalVideos';
import  RecyclingTips  from './RecyclingTips';
import  FunFacts  from './FunFacts';

export function UserDashboard() {
  const [activeSection, setActiveSection] = useState('report-waste');
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
        {/* Toggle Button */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-6 md:hidden">
          <Menu className="w-6 h-6 text-gray-800" />
        </button>

        {/* Logo / Title */}
        <h2 className={`text-2xl font-bold text-green-600 mb-6 transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          Dashboard
        </h2>

        {/* Navigation */}
        <nav className="space-y-5 w-full flex-1">
          <SidebarItem icon={FileText} label="Report Waste" active={activeSection === 'report-waste'} onClick={() => setActiveSection('report-waste')} sidebarOpen={sidebarOpen} />
          <SidebarItem icon={Image} label="Search & Analyze" active={activeSection === 'search'} onClick={() => setActiveSection('search')} sidebarOpen={sidebarOpen} />
          <SidebarItem icon={Users} label="Community" active={activeSection === 'community-engagement'} onClick={() => setActiveSection('community-engagement')} sidebarOpen={sidebarOpen} />
          <SidebarItem icon={Video} label="Educational Videos" active={activeSection === 'educational-videos'} onClick={() => setActiveSection('educational-videos')} sidebarOpen={sidebarOpen} />
          <SidebarItem icon={Lightbulb} label="Recycling Tips" active={activeSection === 'recycling-tips'} onClick={() => setActiveSection('recycling-tips')} sidebarOpen={sidebarOpen} />
          <SidebarItem icon={Lightbulb} label="Fun Facts" active={activeSection === 'fun-facts'} onClick={() => setActiveSection('fun-facts')} sidebarOpen={sidebarOpen} />
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto mb-4 flex items-center gap-4 text-lg text-red-600 hover:text-red-700 transition p-2 rounded-lg w-full"
        >
          <LogOut className="w-6 h-6" />
          <span className={`transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'} md:block whitespace-nowrap truncate`}>
            Logout
          </span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeSection === 'report-waste' && <ReportWaste />}
        {activeSection === 'search' && <ImageSearchSection />}
        {activeSection === 'educational-videos' && <EducationalVideos />}
        {activeSection === 'recycling-tips' && <RecyclingTips />}
        {activeSection === 'fun-facts' && <FunFacts />}
        {activeSection === 'community-engagement' && <CommunityEngagement />}
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
