"use client";

import { useSession } from "@/lib/auth-client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHourglassStart } from "react-icons/fa6";
import { Button } from "../ui/button";

const Header = () => {
  const pathname = usePathname();
  const { data, isPending } = useSession();

  const loggedInNavItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/create", label: "Create" },
    { href: "/profile", label: "Profile" },
    { href: "/settings", label: "Settings" },
  ];

  const navItems = [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How it works" },
  ];

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 90;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm px-4 py-6 border-b md:px-16 lg:px-40">
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
            {isPending
              ? null
              : data?.user
                ? loggedInNavItems.map((item) => (
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
                  ))
                : navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        if (item.label === "Features") {
                          handleSectionClick(e, "features");
                        } else if (item.label === "How it works") {
                          handleSectionClick(e, "how-it-works");
                        }
                      }}
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
          {isPending ? null : data?.user ? "Profile" : (
            <Button asChild className="px-4 py-2 text-lg shadow">
              <Link href={"/login"}>
              Sign up
              </Link>
            </Button>
          )}
        </div>

        <div className="pr-4 md:hidden">
          <Menu size={24} />
        </div>
      </div>
    </nav>
  );
};
export default Header;
