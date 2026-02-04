import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LoginButton from "./login-button";
import { FaArrowLeft } from "react-icons/fa";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-dark p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Login Card */}
        <Card className="border-border-dark bg-surface-dark shadow-2xl">
          <CardHeader className="space-y-3 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-white">
              Sign in to continue
            </CardTitle>
            <CardDescription className="text-center text-text-secondary text-base">
              Select a provider to login securely
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <LoginButton />
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pb-8">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border-dark" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface-dark px-2 text-text-secondary">
                  or
                </span>
              </div>
            </div>

            <Link
              href={"/"}
              className="text-sm text-text-secondary hover:text-primary transition-colors duration-200 text-center w-full"
            >
              <div className="flex items-center justify-center gap-3">
                <FaArrowLeft />
                <span>Back to home</span>
              </div>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default page;
