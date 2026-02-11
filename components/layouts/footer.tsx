import Link from "next/link";
import { FaGithub, FaHourglassStart, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="flex items-center justify-between gap-3 px-4 py-6 border-t md:px-16 lg:px-40">
        <div>
          <Link href={"/"} className="flex items-center gap-2">
            <FaHourglassStart color="#135bec" size={18} />
            <span className="font-normal">DigiCapsule <span className="font-light text-xs">&copy; 2026</span></span>
          </Link>
        </div>

        <div className="flex items-center text-xs gap-2 md:gap-4">
            <Link href={'/'}>
            Home
            </Link>
            <Link href={'mailto:rijandhakal121@outlook.com'}>
            Contact
            </Link>
        </div>

        <div className="flex items-center justify-end gap-2 md:gap-4">
            <Link href={"https://github.com/rijan-dhakal"}>
                <FaGithub />
            </Link>
            <Link href={"https://linkedin.com/in/rijandhakal"}>
                <FaLinkedin />
            </Link>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
