import { FeatureCardProps } from "@/lib/types/types";
import { FolderLock } from "lucide-react";
import Image from "next/image";

const FeatureCard = ({ image, alt, title, description }: FeatureCardProps) => {
  return (
    <div className="p-4 shadow bg-gray-800 rounded-lg w-fit">
      <div className="relative w-64 h-40 md:w-72">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 768px) 288px, 256px"
          className="object-cover"
        />
      </div>

      <div className="mt-4 flex items-center gap-3 w-60 md:w-72">
        <FolderLock
          strokeWidth={2}
          className="text-primary shrink-0"
          height={30}
          width={30}
        />
        <p className="font-bold text-xl">{title}</p>
      </div>

      <div className="w-60 mt-3 text-gray-400 md:w-72">
        <p>{description}</p>
      </div>
    </div>
  );
};
export default FeatureCard;
