import Link from "next/link";
import { Button } from "../ui/button";

const SignupPrompt = () => {
  return (
    <div className=" max-w-xl mx-auto md:max-w-2xl px-4 mb-6">
      <div className="w-full bg-gray-800 rounded-md">
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold">Ready to freeze time?</h3>
          <p className=" mt-2 text-sm leading-relaxed text-white/60">
            Start creating your memory today. It&apos;s free to create your
            first capsule.
          </p>

          <div className="text-center px-5 mt-5">
            <Button
              asChild
              className="font-semibold cursor-pointer w-full md:max-w-fit md:px-4 md:py-2"
            >
              <Link href="/login">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPrompt;
