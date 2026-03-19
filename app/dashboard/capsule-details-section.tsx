import { FaArchive } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { IoMdUnlock } from "react-icons/io";
import StatCard from "./stats-card";

interface CapsuleDetailsSectionProps {
  name: string;
  capsuleDetails: {
    lockedCapsules: number;
    unlockedCapsules: number;
  };
}

const CapsuleDetailsSection = ({
  name,
  capsuleDetails,
}: CapsuleDetailsSectionProps) => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="lg:max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Welcome, {name}!</h1>
        <p className="text-muted-foreground">
          Your memories are safe with us. You have{" "}
          <span className="text-white font-semibold">
            {capsuleDetails.lockedCapsules} locked
          </span>{" "}
          capsules opening soon.
        </p>
      </div>

      {/* Stats section */}
      <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 lg:mt-0 lg:w-auto lg:shrink-0">
        {/* Total Capsules */}
        <StatCard
          icon={<FaArchive color="gray" size={22} />}
          label="TOTAL"
          value={
            capsuleDetails.lockedCapsules + capsuleDetails.unlockedCapsules
          }
          labelColorClass="text-gray-200"
        />

        {/* Locked Capsules */}
        <StatCard
          icon={<IoIosLock size={18} />}
          label="LOCKED"
          value={capsuleDetails.lockedCapsules}
          labelColorClass="text-blue-500"
        />

        {/* Unlocked Capsules */}
        <StatCard
          icon={<IoMdUnlock size={18} />}
          label="UNLOCKED"
          value={capsuleDetails.unlockedCapsules}
          labelColorClass="text-green-500"
        />
      </div>
    </div>
  );
};
export default CapsuleDetailsSection;
