'use client';
import { useState } from 'react';
import Image from 'next/image';
import AboutForm from '../content/About';
import ContentRenderer from '../_components/ContentRenderer';

const navItems = [
  { name: 'Home', icon: '/icon/db-home-1.png' },
  { name: 'Users', icon: '/icon/db-user-1.png' },
  { name: 'Projects/Researcher', icon: '/icon/db-research-1.png' },
  { name: 'Gallery', icon: '/icon/db-gallery.png' },
  { name: 'Contact', icon: '/icon/db-contact.png' },
  { name: 'About', icon: '/icon/db-about.png' },
];

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`flex flex-col border-r border-[#DCDCDC] bg-[#F8F8F8] transition-all duration-300 ${
          sidebarOpen ? 'w-[268px] p-6' : 'w-20 p-2'
        }`}
      >
        {/* Sidebar Header */}
        <div className="mb-8 flex h-12 items-center justify-between">
          {sidebarOpen && <div className="h-9 w-9 bg-gray-400"></div>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`flex items-center justify-center rounded-lg ${
              sidebarOpen ? 'h-9 w-9' : 'h-12 w-12'
            }`}
          >
            <Image
              src={'/icon/db-toggle-1.png'}
              alt={'toggle'}
              width={26}
              height={26}
            />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`flex items-center rounded-lg transition-colors ${
                  sidebarOpen
                    ? `h-12 w-full gap-3 px-3 ${isActive ? 'bg-[#E0E0E0]' : 'hover:bg-[#F0F0F0]'}`
                    : `h-12 w-12 justify-center ${isActive ? 'bg-[#E0E0E0]' : 'hover:bg-[#F0F0F0]'}`
                }`}
              >
                <Image src={item.icon} alt={item.name} width={24} height={24} />
                {sidebarOpen && (
                  <span className="text-[16px] font-medium">{item.name}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-300 px-4 md:h-20 md:px-6 lg:px-8">
          <h1 className="truncate text-lg font-semibold md:text-xl lg:text-2xl">
            {activeItem}
          </h1>
          <div className="flex items-center gap-3 md:gap-4">
            {/* Notifications */}
            <button className="relative">
              <Image
                src="/icon/db-notifikasi.png"
                alt="Notifications"
                width={24}
                height={24}
              />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Profile */}
            <div className="h-8 w-8 rounded-full bg-gray-300 md:h-10 md:w-10"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-50 p-6">
          <ContentRenderer activeItem={activeItem} />
        </div>
      </div>
    </div>
  );
}
