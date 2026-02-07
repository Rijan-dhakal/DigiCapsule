"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHourglassStart } from "react-icons/fa6";


const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/create", label: "Create" },
    { href: "/profile", label: "Profile" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className="px-4 py-6 border-b md:px-16 lg:px-40">
      <div className="flex items-center justify-between">
        {/* Logo */}

        <div>
          <Link href={"/"} className="flex items-center gap-2">
            <FaHourglassStart color="#135bec" size={34} />
            <span className="text-2xl font-extrabold">DigiCapsule</span>
          </Link>
        </div>

        {/* Navigation */}
        <div>
          <ul className="hidden md:flex md:items-center md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-semibold transition-colors ${
                  pathname === item.href
                    ? "text-white "
                    : "text-gray-400 hover:text-[#c4c5c9]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </ul>
        </div>

        <div className="hidden md:block">
          Profile
        </div>

        <div className="pr-4 md:hidden">
          <Menu size={24} />
        </div>
        
      </div>
    </nav>
  );
};
export default Header;
