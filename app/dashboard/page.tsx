import { checkSession } from "@/lib/helper/check-session";
import CapsuleDetailsSection from "./capsule-details-section";
import { GetUserCapsulesAction } from "@/actions/fetch-user-capsules";

const Dashboard = async () => {
  const session = await checkSession(
    "You need to be logged in to access dashboard.",
  );

  const { data } = await GetUserCapsulesAction();

  const lockedCapsules = data
    ? data.filter((capsule) => capsule.status === "locked")
    : [];

  return (
    <div className=" mt-4 min-h-[90vh] md:min-h-[85vh] lg:min-h-[80vh]">
      <div>
        <CapsuleDetailsSection
          name={session.user.name}
          capsuleDetails={{
            lockedCapsules: lockedCapsules.length,
            unlockedCapsules: data ? data.length - lockedCapsules.length : 0,
          }}
        />
      </div>
    </div>
  );
};
export default Dashboard;
