import Link from "next/link";
import { Button } from "../ui/button";

const TopMainSection = () => {
  return (
    <section className="relative mt-8 lg:mt-12 lg:mb-20">
      <div
        className="absolute inset-0 bg-cover opacity-40"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundPosition: "center 55%",
        }}
      />
      <div className="relative z-10 py-16 px-4 lg:pb-48 lg:px-10">
        <div className="text-center">
          <h1 className="font-bold text-3xl md:leading-12 md:text-5xl lg:leading-16 lg:text-6xl ">
            Schedule your Messages For The Future
          </h1>
          <p className="text-lg mt-6 px-3 font-normal lg:text-xl">
            Create time locked digital capsules. Upload memories today, and
            we'll <br /> keep them safe until the moment is right
          </p>
          <div className="mt-12 gap-4 flex flex-col justify-center md:flex-row md:items-center">
            <Button className="cursor-pointer text-lg">
              <Link href="/login">Create your first capsule</Link>
            </Button>
            <Button
              asChild
              className="cursor-pointer text-lg"
              variant={"outline"}
            >
              <Link href="/#features">Learn more</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TopMainSection;
