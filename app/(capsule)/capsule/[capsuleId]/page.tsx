import {
  GetCapsuleByLink,
  GetCapsuleFiles,
  GetCapsuleFilesByLink,
  GetCapsuleFromId,
} from "@/actions/fetch-capsules";
import { Link2 } from "lucide-react";
import Link from "next/link";
import CapsuleLockedView from "./components/capsule-locked-view";
import OpenedCapsule from "@/components/ui/shared/opened-capsule";

const CapsulePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ capsuleId: string }>;
  searchParams: Promise<{ key: string }>;
}) => {
  const capsuleId = (await params).capsuleId;
  const key = (await searchParams).key;

  let fetchedCapsule;

  if (key) {
    fetchedCapsule = await GetCapsuleByLink({ capsuleId, key });
  } else {
    fetchedCapsule = await GetCapsuleFromId({ capsuleId });
  }

  if (!fetchedCapsule.data || !fetchedCapsule.success) {
    return (
      <div className="flex h-96 items-center justify-center rounded-md border border-gray-700 bg-gray-800/60 p-4">
        <p className="text-sm text-gray-400">Capsule not found.</p>
      </div>
    );
  }

  const capsuleData = Array.isArray(fetchedCapsule.data)
    ? fetchedCapsule.data[0]
    : fetchedCapsule.data;

  if (!capsuleData) {
    return (
      <div className="flex h-96 items-center justify-center rounded-md border border-gray-700 bg-gray-800/60 p-4">
        <p className="text-sm text-gray-400">Capsule not found.</p>
      </div>
    );
  }

  const markdown = capsuleData.content ?? "No data found";

  let capsuleFiles, attachedMemories, attachedDocuments;

  if (capsuleData.status === "unlocked") {
    capsuleFiles = key
      ? await GetCapsuleFilesByLink({
          capsuleId: capsuleData.id,
          accessKey: key,
        })
      : await GetCapsuleFiles({ capsuleId: capsuleData.id });
    const allFiles = capsuleFiles.data ?? [];
    attachedMemories = allFiles.filter((file) => file.fileType === "image");
    attachedDocuments = allFiles.filter((file) => file.fileType !== "image");
  }

  return (
    <>
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 shadow-sm shadow-black/10 transition hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-white"
        >
          <Link2 className="h-5 w-5 text-sky-300" />
          <span>Visit DigiCapsule</span>
        </Link>
      </div>
      {/* Locked view */}

      {capsuleData.status === "unlocked" ? (
        <OpenedCapsule
          markdown={markdown}
          attachedDocuments={attachedDocuments || []}
          attachedMemories={attachedMemories || []}
        />
      ) : (
        <CapsuleLockedView
          title={capsuleData.title}
          createdAt={capsuleData.createdAt}
          unlockAt={capsuleData.unlockAt}
          hint={capsuleData.hint || undefined}
          previewImageUrl={capsuleData.previewImageUrl || undefined}
          category={capsuleData.category}
          creatorName={capsuleData.creatorName || "Unknown"}
          userId={capsuleData.userId}
        />
      )}
    </>
  );
};
export default CapsulePage;
