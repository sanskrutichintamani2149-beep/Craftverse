import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { BackdropScene } from '@/components/common/BackdropScene';
import { AiMentorDrawer } from '@/components/mentor/AiMentorDrawer';

export const AppShell: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex text-typography-bodyDark relative overflow-x-hidden">
      {/* Ambient background glows */}
      <BackdropScene variant="subtle" />

      {/* Desktop / Tablet Sidebar (sticky) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <Sidebar
            className="relative z-50 h-full w-72"
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 p-5 md:p-8 lg:p-10 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          <Outlet />
        </main>
      </div>

      {/* Contextual Floating AI Mentor */}
      <AiMentorDrawer />
    </div>
  );
};
