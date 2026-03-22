import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CapsuleType } from "@/lib/types/types";
import { IoIosLock } from "react-icons/io";
import { IoMdUnlock } from "react-icons/io";

const triggers = [
  { value: "all", label: "All Capsules" },
  { value: "locked", label: "Locked", icon: <IoIosLock size={18} /> },
  { value: "unlocked", label: "Unlocked", icon: <IoMdUnlock size={18} /> },
];

const TabsComponent = ({
  capsules,
  loading,
}: {
  capsules: CapsuleType[];
  loading: boolean;
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  const lockedCapsules = capsules.filter(
    (capsule) => capsule.status === "locked",
  );
  const unlockedCapsules = capsules.filter(
    (capsule) => capsule.status === "unlocked",
  );

  return (
    <Tabs defaultValue="all">
      <TabsList className="bg-gray-800 p-1 rounded-xl flex gap-2">
        {triggers.map(({ value, label, icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="cursor-pointer text-md font-semibold data-[state=active]:bg-white data-[state=active]:text-black rounded-lg"
          >
            {icon}
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="all">
        {capsules.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </TabsContent>

      <TabsContent value="locked">
        {lockedCapsules.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </TabsContent>

      <TabsContent value="unlocked">
        {unlockedCapsules.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
