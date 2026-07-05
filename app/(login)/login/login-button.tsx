"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { createAuthClient } from "better-auth/client";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const LoginButton = () => {
  const authClient = createAuthClient();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    setIsLoading(true);
    try {
      const resp = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
      if (resp.error) {
        setIsLoading(false);
        return toast.error(resp.error.message);
      }
    } catch (e) {
      setIsLoading(false);
      console.error(e instanceof Error ? e.message : "Error. Try again");
      return toast.error(e instanceof Error ? e.message : "Error. Try again");
    }
  };

  return (
    <Button
      onClick={signIn}
      disabled={isLoading}
      className="w-full bg-primary hover:bg-[#1f66f4a5] text-white py-6 text-base font-medium cursor-pointer"
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-4">
          <Spinner className="w-6! h-6!" />

          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <FcGoogle className="w-6! h-6! size-6 font-bold" />

          <span>Sign in with google</span>
        </div>
      )}
    </Button>
  );
};
export default LoginButton;
