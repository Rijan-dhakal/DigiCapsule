"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CapsuleSchema, TCapsuleSchema } from "@/lib/validators/capsules";
import CardComponent from "./components/card-component";
import DatePicker from "react-datepicker";
import MarkdownEditor from "./components/markdown-editor";
import { Button } from "@/components/ui/button";
import ErrorContainer from "./components/error-container";
import FileUpload from "./components/file-uploads";
import { toast } from "sonner";
import { CreateCapsuleAction } from "@/actions/capsule";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AlertBox } from "@/components/ui/shared/alert-box";
import { UploadedAsset } from "@/lib/types/types";
import { uploadToCloudinary } from "./upload-to-cloudinary";
import BackToDashboard from "@/components/ui/shared/back-to-dashboard";
import { GetCapsuleLimitInfo } from "@/actions/user-details";
import { Sparkles } from "lucide-react";
import { improveContent } from "@/actions/improve-content";

const CreatePage = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<TCapsuleSchema | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const submitLockRef = useRef(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<TCapsuleSchema>({
    resolver: zodResolver(CapsuleSchema),
  });

  const handleImproveContent = async () => {
    setIsImproving(true);
    const content = getValues("content");

    try {
      if (!content || content.trim() === "") {
        toast.error(
          "Content is empty. Please add some content before improving.",
        );
        return;
      }

      const improvedContentResponse = await improveContent(content);
      if (!improvedContentResponse.success) {
        return toast.error(
          improvedContentResponse.message ??
            "Failed to improve content. Try again.",
        );
      }

      if (
        !improvedContentResponse.content ||
        improvedContentResponse.content.trim() === ""
      ) {
        return toast.error("Failed to improve content. Try again.");
      }

      setValue("content", improvedContentResponse.content);
      toast.success("Content improved successfully.");
    } catch (error) {
      console.error("Error occurred while checking plan", error);
      toast.error("An error occurred. Please try again.");
      return;
    } finally {
      setIsImproving(false);
    }
  };

  const onSubmit = async function (data: TCapsuleSchema) {
    const checkQuota = await GetCapsuleLimitInfo();
    if (!checkQuota.success) {
      toast.error(
        checkQuota.message ??
          "Failed to check capsule creation quota. Try again.",
      );
      return;
    }

    setFormData(data);
    setOpenDialog(true);
  };

  const confirmSubmit = async function () {
    if (submitLockRef.current) return;

    if (!formData) return;

    submitLockRef.current = true;
    setOpenDialog(false);
    setIsSubmitting(true);

    try {
      const filesToUpload = formData.files ?? [];
      let uploadedAssets: UploadedAsset[] = [];

      if (filesToUpload.length > 0) {
        toast.loading("Uploading files...", {
          id: "cloudinary-upload",
        });

        uploadedAssets = await Promise.all(
          filesToUpload.map((file) => uploadToCloudinary(file)),
        );

        toast.success("Files uploaded successfully", {
          id: "cloudinary-upload",
        });
      }

      const payload = {
        ...formData,
        ...(uploadedAssets.length > 0 && {
          previewImageUrl: uploadedAssets[0].secureUrl,
        }),
        files: uploadedAssets.map((file) => ({
          url: file.secureUrl,
          publicId: file.publicId,
          fileType: file.resourceType,
        })),
      };

      const capsuleCreationResponse = await CreateCapsuleAction(payload);

      if (!capsuleCreationResponse.success) {
        toast.error(
          capsuleCreationResponse.message ??
            "Failed to create a capsule. Try again.",
        );
        return;
      }

      router.prefetch("/dashboard");
      toast.success("Capsule created successfully.");
      reset();
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "File upload failed";
      toast.error(message, {
        id: "cloudinary-upload",
      });
      console.error("Cloudinary upload failed:", error);
    } finally {
      // Timeout to prevent resubmitting in delay between redirects
      setTimeout(() => {
        submitLockRef.current = false;
        setIsSubmitting(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-[90vh] mx-auto max-w-3xl md:min-h-[85vh] lg:min-h-[80vh]">
      {/* Back to dashboard */}
      <BackToDashboard />

      <div className="mt-4">
        <h3 className="text-4xl font-extrabold">Create New Capsule</h3>
        <p className="text-gray-300 mt-2">
          Preserve your memories securely. Choose when they unlock.
        </p>
      </div>

      <div className="mt-4 overflow-y-scroll">
        <form
          id="form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          {/* Title and category */}
          <div>
            <CardComponent count={1} title="The Basics">
              <div className="flex flex-col gap-10">
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="input" className="font-semibold text-lg">
                    Capsule Title
                  </label>
                  <input
                    id="input"
                    type="text"
                    {...register("title")}
                    placeholder="Trip to Nepal"
                    className="h-10 py-4 px-3 font-semibold border border-gray-500 rounded bg-gray-800 outline-none focus:border-gray-300"
                  />

                  {errors.title && (
                    <ErrorContainer message={errors.title.message} />
                  )}
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="font-semibold text-lg">
                    Category
                  </label>
                  <input
                    id="category"
                    type="text"
                    max={30}
                    {...register("category")}
                    placeholder="eg. Memory"
                    className="h-10 py-4 px-3 font-semibold border border-gray-500 rounded bg-gray-800 outline-none focus:border-gray-300"
                  />
                  {errors.category && (
                    <ErrorContainer message={errors.category.message} />
                  )}
                </div>
              </div>
            </CardComponent>
          </div>

          {/* Markdown for content */}
          <div>
            <CardComponent count={2} title="The Memory">
              <div className="flex items-center justify-between mb-2">
                <label className="font-semibold text-lg mb-2">
                  Capsule Content
                </label>
                <Button
                  type="button"
                  className="relative bg-linear-to-r cursor-pointer from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 "
                  onClick={handleImproveContent}
                  disabled={isImproving}
                >
                  {isImproving ? (
                    "Improving..."
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      <span>Improve with AI</span>
                    </>
                  )}
                </Button>
              </div>

              <Controller
                name="content"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <MarkdownEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.content && (
                <ErrorContainer message={errors.content.message} />
              )}
              {/* Container for file uploads */}
              <div className="mt-4">
                <Controller
                  name="files"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <FileUpload value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
            </CardComponent>
          </div>

          {/* Unlock date and time */}
          <div>
            <CardComponent count={3} title="The Lock">
              <div>
                <label
                  htmlFor="unlockAt"
                  className="font-semibold text-lg block mb-2"
                >
                  Unlock Date & Time
                </label>
                <Controller
                  name="unlockAt"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="h-10 py-3 px-3 font-semibold border border-gray-500 rounded bg-gray-800 outline-none focus:border-gray-300 w-full"
                      placeholderText="Select unlock date and time"
                      minDate={new Date()}
                    />
                  )}
                />
                {errors.unlockAt && (
                  <ErrorContainer message={errors.unlockAt.message} />
                )}
              </div>

              <div className="mt-8 flex flex-col space-y-2">
                <label htmlFor="hint" className="space-x-1">
                  <span className="font-semibold">Hint for Receiver</span>

                  <span className="text-sm text-gray-500 mr-2">(Optional)</span>
                </label>
                <input
                  id="hint"
                  type="text"
                  {...register("hint")}
                  placeholder="eg. Graduation day"
                  className="h-10 py-4 px-3 font-semibold border border-gray-500 rounded bg-gray-800 outline-none focus:border-gray-300"
                />
                {errors.hint && (
                  <ErrorContainer message={errors.hint.message} />
                )}
              </div>
            </CardComponent>
          </div>

          {/* Recipient Email */}
          <div>
            <CardComponent count={4} title="Delivery">
              <label htmlFor="recipientEmail" className="font-semibold text-lg">
                Recipient Email
                <p className="text-sm text-gray-500 mb-2">
                  Your own email address can be used as the recipient.
                </p>
              </label>
              <input
                id="recipientEmail"
                type="email"
                {...register("recipientEmail")}
                placeholder="person@example.com"
                autoComplete="username"
                className="h-10 py-4 px-3 font-semibold border border-gray-500 rounded bg-gray-800 outline-none focus:border-gray-300"
              />
              {errors.recipientEmail && (
                <ErrorContainer message={errors.recipientEmail.message} />
              )}
            </CardComponent>
          </div>

          <div className="mb-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 w-full text-lg font-semibold rounded-md cursor-pointer "
            >
              {isSubmitting ? "Creating..." : "Create Capsule"}
            </Button>
          </div>
        </form>
      </div>
      <AlertBox
        open={openDialog}
        onOpenChange={setOpenDialog}
        onConfirm={confirmSubmit}
        alertTitle="Confirm Capsule Creation"
        alertDescription="Once created, this capsule cannot be edited. Please review the details to make sure everything is correct before continuing."
        alertActionText="Create Capsule"
        alertCancelText="Cancel"
        actionButtonVariant="default"
        isLoading={isSubmitting}
        otherInfo="You can only preview the capsule after it's created, so make sure all the information is accurate."
        actionDelaySeconds={5}
      />
    </div>
  );
};
export default CreatePage;
