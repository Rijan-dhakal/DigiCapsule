import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  labelColorClass: string;
}

const StatCard = ({ icon, label, value, labelColorClass }: StatCardProps) => {
  return (
    <div className="min-h-24 w-full min-w-0 rounded-lg border border-gray-700 bg-gray-800 shadow lg:min-h-20 lg:w-28 xl:w-32">
      <p
        className={`flex items-center gap-1 px-2 pt-2 text-[11px] font-semibold leading-none sm:gap-2 sm:text-sm ${labelColorClass}`}
      >
        {icon}
        {label}
      </p>

      <p className="px-2 pb-2 pt-2 text-xl font-bold leading-none text-white sm:text-3xl lg:text-2xl xl:text-3xl">
        {value}
      </p>
    </div>
  );
};

export default StatCard;
