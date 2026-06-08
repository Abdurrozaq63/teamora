'use client';
import { useLogout } from '@/features/auth/hooks/useLogout';
import Link from 'next/link';
import { useState } from 'react';

type MenuItem = {
  name: string;
  href?: string;
  action?: string;
};

type NavbarProps = {
  menus?: MenuItem[];
};

export default function Navbar({ menus = [] }: NavbarProps) {
  const [toogle, setToogle] = useState(3);
  const [viewProfil, setViewProfil] = useState('hidden');
  const { logout } = useLogout();

  const handleProfilView = () => {
    setToogle((prev) => prev + 1);
    const num = toogle % 2;
    if (num == 0) {
      setViewProfil('hidden');
    }
    if (num == 1) {
      setViewProfil('');
    }
  };
  return (
    <header className=" border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-16 max-w-7xl justify-between items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center text-xl">
          <span className="font-bold dark:text-white">Team</span>

          <span className=" rounded-lg border-2 border-lime-600 px-1 text-base font-medium text-lime-600 dark:border-lime-500 dark:text-lime-500">
            Ora
          </span>
        </Link>
        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div onClick={handleProfilView} className="cursor-pointer">
            <img
              src="/account.svg"
              alt="profile"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
          <nav
            className={`fixed top-20 right-10 w-52 border border-white/40  shadow-sm rounded-2xl overflow-hidden ${viewProfil}`}>
            <ul className="flex flex-col items-start text-lg">
              {menus.map((menu, index) => (
                <li className="bg-gray-900 w-full p-3 h-full " key={index}>
                  {menu.href ? (
                    <Link
                      href={menu.href}
                      className="text-gray-500 transition hover:text-gray-700 dark:text-white dark:hover:text-white/75">
                      {menu.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        if (menu.action === 'logout') {
                          logout();
                        }
                      }}
                      className="text-gray-500 transition cursor-pointer hover:text-gray-700 dark:text-white dark:hover:text-white/75">
                      {menu.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
