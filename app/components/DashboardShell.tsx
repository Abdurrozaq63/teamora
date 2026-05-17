'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface Props {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardShell({ sidebar, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-1 relative">
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky
          top-16 left-0
          z-50 lg:z-0
          h-[calc(100vh-64px)]
          w-64
          transition-transform duration-300
          bg-white dark:bg-gray-950
          border-r border-gray-200 dark:border-gray-800

          ${open ? 'translate-x-0' : '-translate-x-full'}

          lg:translate-x-0
        `}>
        {sidebar}
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Toggle Button */}
        <div className="lg:hidden p-4">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
