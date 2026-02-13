import Link from "next/link";
import { Button } from "../ui/button";

interface HamburgerSignupButtonProps {
  setIsSheetOpen: (open: boolean) => void;
}

const HamburgerSignupButton = ({
  setIsSheetOpen,
}: HamburgerSignupButtonProps) => {
  return (
    <Button
      onClick={() => setIsSheetOpen(false)}
      className="font-semibold text-lg px-4 py-2 cursor-pointer mt-4"
      asChild
    >
      <Link href={"/login"}>Sign up</Link>
    </Button>
  );
};
export default HamburgerSignupButton;
