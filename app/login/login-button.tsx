"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { createAuthClient } from "better-auth/client";
import { toast } from "sonner";

const LoginButton = () => {
  const authClient = createAuthClient();
  const signIn = async () => {
    try {
      const resp = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
      if (resp.error) {
        return toast.error(resp.error.message);
      }
    } catch (e: any) {
      console.error(e.message);
      return toast.error(e.message);
    }
  };

  return (
    <Button
      onClick={signIn}
      className="w-full bg-primary hover:bg-[#1f66f4a5] text-white py-6 text-base font-medium cursor-pointer"
    >
      <div className="flex items-center justify-center gap-4">
        <FcGoogle className="w-6! h-6! size-6 font-bold" />

        <span>Sign in with google</span>
      </div>
    </Button>
  );
};
export default LoginButton;
