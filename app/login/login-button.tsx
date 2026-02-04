"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const LoginButton = () => {
  return (
    <Button className="w-full bg-primary hover:bg-[#1f66f4a5] text-white py-6 text-base font-medium cursor-pointer">
        <div className="flex items-center justify-center gap-4">
        <FcGoogle className="w-6! h-6! size-6 font-bold" />

      <span>Sign in with google</span>
        </div>
    </Button>
  );
};
export default LoginButton;