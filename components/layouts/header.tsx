"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHourglassStart } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useState } from "react";
import HamburgerMenu from "../homepage/hamburger-menu";

const Header = () => {
  const pathname = usePathname();
  const { data, isPending } = useSession();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const cookie =
    typeof document !== "undefined"
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("__Secure-better-auth.session_token="))
          ?.split("=")[1]
      : undefined;

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

  const renderNavItems = (items: typeof navItems) =>
    items.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={(e) => {
          if (item.label === "Features") {
            handleSectionClick(e, "features");
          } else if (item.label === "How it works") {
            handleSectionClick(e, "how-it-works");
          }
          setIsSheetOpen(false);
        }}
        className={`font-semibold transition-colors ${
          pathname === item.href
            ? "text-white"
            : "text-gray-400 hover:text-[#c4c5c9]"
        }`}
      >
        {item.label}
      </Link>
    ));

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
              ? cookie
                ? renderNavItems(loggedInNavItems)
                : renderNavItems(navItems)
              : data?.user
                ? renderNavItems(loggedInNavItems)
                : renderNavItems(navItems)}
          </ul>
        </div>

        <div className="hidden md:block">
          {isPending ? null : data?.user ? (
            "Profile"
          ) : (
            <Button asChild className="px-4 py-2 text-lg shadow">
              <Link href={"/login"}>Sign up</Link>
            </Button>
          )}
        </div>

        <div className="pr-4 md:hidden">
          <HamburgerMenu
            isPending={isPending}
            data={data}
            isSheetOpen={isSheetOpen}
            loggedInNavItems={loggedInNavItems}
            navItems={navItems}
            renderNavItems={renderNavItems}
            setIsSheetOpen={setIsSheetOpen}
          />
        </div>
      </div>
    </nav>
  );
};
export default Header;
