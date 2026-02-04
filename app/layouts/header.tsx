import { Menu } from "lucide-react";
import Link from "next/link";
import { FaHourglassStart } from "react-icons/fa6";


const Header = () => {
  return (
    <nav className="px-4 py-6 border-b md:px-8">
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
            <Link href={"/dashboard"} className="font-semibold">
              Dashboard
            </Link>
            <Link href={"/create"} className="font-semibold">
              Create
            </Link>
            <Link href={"/profile"} className="font-semibold">
              Profile
            </Link>
            <Link href={"/settings"} className="font-semibold">
              Settings
            </Link>
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
