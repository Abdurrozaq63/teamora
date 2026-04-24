'use client';

import Link from 'next/link';

type MenuItem = {
  name: string;
  href?: string;
  onClick?: () => void;
};

type NavbarProps = {
  menus?: MenuItem[];
};

export default function Navbar({ menus = [] }: NavbarProps) {
  return (
    <header className=" border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center text-xl">
          <span className="font-bold dark:text-white">Team</span>
          <span className="dark:text-white">Ora</span>
          <span className="ml-1 rounded-lg border-2 border-lime-600 px-1 text-base font-medium text-lime-600 dark:border-lime-500 dark:text-lime-500">
            1.0
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          {/* MENU (Reusable) */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-lg">
              {menus.map((menu, index) => (
                <li key={index}>
                  {menu.href ? (
                    <Link
                      href={menu.href}
                      className="text-gray-500 transition hover:text-gray-700 dark:text-white dark:hover:text-white/75">
                      {menu.name}
                    </Link>
                  ) : (
                    <button
                      onClick={menu.onClick}
                      className="text-gray-500 transition hover:text-gray-700 dark:text-white dark:hover:text-white/75">
                      {menu.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <input
                className="h-10 w-full rounded-lg border-none bg-gray-100 ps-4 pe-10 text-sm shadow-sm sm:w-56 dark:bg-gray-800 dark:text-white"
                type="search"
                placeholder="Search..."
              />
            </div>

            {/* Profile */}
            <div className="hidden sm:block">
              <img
                src="/account.svg"
                alt="profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>

            {/* Mobile Menu Button */}
            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 md:hidden dark:bg-gray-800 dark:text-white">
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
