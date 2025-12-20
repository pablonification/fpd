'use client';
import { useState } from 'react';
import Image from 'next/image';
import AboutForm from '../content/About';
import ContentRenderer from '../_components/ContentRenderer';

const navItems = [
  { name: 'Home', icon: '/icon/db-home-1.png' },
  { name: 'Users', icon: '/icon/db-user-1.png' },
  { name: 'Research Projects', icon: '/icon/db-research-1.png' },
  { name: 'Researcher', icon: '/icon/db-researcher.png' },
  { name: 'Gallery', icon: '/icon/db-gallery.png' },
  { name: 'News', icon: '/icon/db-news-2.png' },
  { name: 'Contact', icon: '/icon/db-contact.png' },
  { name: 'About', icon: '/icon/db-about.png' },
];

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop toggle
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile toggle
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* MOBILE BACKDROP OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[#DCDCDC] bg-[#F8F8F8] transition-all duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:relative md:translate-x-0 
          ${sidebarOpen ? 'md:w-[268px] md:p-6' : 'md:w-20 md:p-2'}
          w-[268px] p-6
        `}
      >
        {/* Sidebar Header */}
        <div className="mb-8 flex h-12 items-center justify-between">
          {/* Logo Placeholder (visible if open or on mobile) */}
          {(sidebarOpen || mobileOpen) && <div className="h-9 w-9 rounded bg-gray-400"></div>}

          {/* Desktop Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`hidden md:flex items-center justify-center rounded-lg transition-all ${sidebarOpen ? 'h-9 w-9' : 'h-12 w-12'
              }`}
          >
            <Image
              src={'/icon/db-toggle-1.png'}
              alt={'toggle'}
              width={26}
              height={26}
            />
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="flex md:hidden items-center justify-center h-9 w-9"
          >
            <span className="text-xl font-bold">✕</span>
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex flex-col gap-3 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveItem(item.name);
                  setMobileOpen(false); // Close on mobile click
                }}
                className={`flex items-center rounded-lg transition-colors whitespace-nowrap
                  ${/* Mobile: always full width */ ''}
                  md:transition-all
                  ${sidebarOpen
                    ? `h-12 w-full gap-3 px-3`
                    : `md:h-12 md:w-12 md:justify-center md:px-0 h-12 w-full gap-3 px-3`
                  }
                  ${isActive ? 'bg-[#E0E0E0]' : 'hover:bg-[#F0F0F0]'}
                `}
              >
                <div className="flex-shrink-0">
                  <Image src={item.icon} alt={item.name} width={24} height={24} />
                </div>
                {/* Text: Visible on Mobile, or Desktop Open */}
                <span className={`text-[16px] font-medium transition-opacity duration-200
                  ${!sidebarOpen ? 'md:hidden' : 'md:block'}
                `}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-300 px-4 md:h-20 md:px-6 lg:px-8 bg-white">
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 -ml-2 text-gray-700"
            >
              {/* Simple Hamburger Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>

            <h1 className="truncate text-lg font-semibold md:text-xl lg:text-2xl">
              {activeItem}
            </h1>
          </div>

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

        {/* Content Content */}
        <div className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <ContentRenderer activeItem={activeItem} />
        </div>
      </div>
    </div>
  );
}
