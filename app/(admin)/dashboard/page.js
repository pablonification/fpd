'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop toggle
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile toggle
  const [activeItem, setActiveItem] = useState('Home');

  // Header State
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [latestUpdates, setLatestUpdates] = useState([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch Data (Stats & User)
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Stats
        const statsRes = await fetch('/api/dashboard/stats');
        const statsJson = await statsRes.json();
        if (statsJson.success) {
          setLatestUpdates(statsJson.data.latestUpdates);

          // Check if there are new notifications since last seen
          const lastSeen = localStorage.getItem('notifLastSeen');
          if (statsJson.data.latestUpdates.length > 0) {
            const latestTime = new Date(
              statsJson.data.latestUpdates[0].time
            ).getTime();
            const lastSeenTime = lastSeen ? parseInt(lastSeen, 10) : 0;
            setHasNewNotifications(latestTime > lastSeenTime);
          }
        }

        // Fetch User
        const userRes = await fetch('/api/auth/me');
        const userJson = await userRes.json();
        if (userJson.success) {
          setUser(userJson.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Fallback redirect even if API fails
      router.push('/login');
    }
  };

  const getRoleLabel = (role) => {
    if (role === 'admin') return 'Administrator';
    if (role === 'editor') return 'Content Editor';
    return 'Viewer';
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* MOBILE BACKDROP OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[#DCDCDC] bg-[#F8F8F8] transition-all duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 ${sidebarOpen ? 'md:w-[268px] md:p-6' : 'md:w-20 md:p-2'} w-[268px] p-6`}
      >
        {/* Sidebar Header */}
        <div className="mb-8 flex h-12 items-center justify-between">
          {/* Logo (full when open/mobile, icon when collapsed) */}
          {sidebarOpen || mobileOpen ? (
            <Image
              src="/final-logo-full.svg"
              alt="Si-Zero Logo"
              width={360}
              height={180}
              className="h-14 w-auto"
            />
          ) : (
            <></>
          )}

          {/* Desktop Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`hidden items-center justify-center rounded-lg transition-all md:flex ${
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

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center md:hidden"
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
                className={`flex items-center rounded-lg whitespace-nowrap transition-colors ${/* Mobile: always full width */ ''} md:transition-all ${
                  sidebarOpen
                    ? `h-12 w-full gap-3 px-3`
                    : `h-12 w-full gap-3 px-3 md:h-12 md:w-12 md:justify-center md:px-0`
                } ${isActive ? 'bg-[#E0E0E0]' : 'hover:bg-[#F0F0F0]'} `}
              >
                <div className="flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                  />
                </div>
                {/* Text: Visible on Mobile, or Desktop Open */}
                <span
                  className={`text-[16px] font-medium transition-opacity duration-200 ${!sidebarOpen ? 'md:hidden' : 'md:block'} `}
                >
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
        <div className="relative z-30 flex h-16 items-center justify-between border-b border-gray-300 bg-white px-4 md:h-20 md:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="-ml-2 p-2 text-gray-700 md:hidden"
            >
              {/* Simple Hamburger Icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <h1 className="truncate text-lg font-semibold md:text-xl lg:text-2xl">
              {activeItem}
            </h1>
          </div>

          <div className="relative flex items-center gap-3 md:gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  const isOpening = !notifOpen;
                  setNotifOpen(isOpening);
                  setProfileOpen(false);
                  if (isOpening && latestUpdates.length > 0) {
                    localStorage.setItem(
                      'notifLastSeen',
                      Date.now().toString()
                    );
                    setHasNewNotifications(false);
                  }
                }}
                className="relative flex items-center justify-center rounded-full p-2 outline-none hover:bg-gray-100"
              >
                <Image
                  src="/icon/db-notifikasi.png"
                  alt="Notifications"
                  width={24}
                  height={24}
                />
                {hasNewNotifications && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notifOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
                    Notifications
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {latestUpdates.length === 0 ? (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No new updates.
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        {latestUpdates.map((update, index) => (
                          <div
                            key={index}
                            className="border-b border-gray-100 p-3 last:border-0 hover:bg-gray-50"
                          >
                            <p className="mb-1 line-clamp-2 text-sm font-medium text-gray-800">
                              {update.text}
                            </p>
                            <p className="text-xs text-gray-500">
                              {timeAgo(update.time)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 rounded-full p-1 transition-colors outline-none hover:bg-gray-100 md:pr-3"
              >
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-300 md:h-10 md:w-10">
                  {/* Real User Avatar from DB */}
                  <Image
                    src={
                      user?.avatarUrl ||
                      'https://api.dicebear.com/9.x/avataaars/svg?seed=Admin'
                    }
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="hidden flex-col items-start md:flex">
                  <span className="text-sm leading-none font-medium text-gray-900">
                    {user ? user.name : 'Loading...'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {user ? getRoleLabel(user.role) : '...'}
                  </span>
                </div>
                <svg
                  className="hidden h-4 w-4 text-gray-400 md:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-xl">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user?.name || 'User'}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user?.email || ''}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Content */}
        <div
          className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6"
          onClick={() => {
            setNotifOpen(false);
            setProfileOpen(false);
          }}
        >
          <ContentRenderer activeItem={activeItem} />
        </div>
      </div>
    </div>
  );
}
