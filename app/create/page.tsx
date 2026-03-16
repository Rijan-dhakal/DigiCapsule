"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CapsuleSchema, TCapsuleSchema } from "@/lib/validators/capsules";
import CardComponent from "./card-component";
import DatePicker from "react-datepicker";
import MarkdownEditor from "./markdown-editor";
import { Button } from "@/components/ui/button";
import ErrorContainer from "./error-container";
import FileUpload from "./file-uploads";
import { toast } from "sonner";
import { checkSession } from "@/lib/helper/check-session";
import { CreateCapsuleAction } from "@/actions/create-capsule";
import { useRouter } from "next/navigation";

interface CloudinarySignatureResponse {
  signature: string;
  timestamp: number;
  folder: string;
  cloudName: string;
  apiKey: string;
}

interface UploadedAsset {
  url: string;
  secureUrl: string;
  publicId: string;
  resourceType: string;
  originalFilename: string;
}

const CreatePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCapsuleSchema>({
    resolver: zodResolver(CapsuleSchema),
  });

  const uploadToCloudinary = async (file: File): Promise<UploadedAsset> => {
    const timestamp = Math.floor(Date.now() / 1000);

    const signatureResponse = await fetch("/api/cloudinary/signature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp }),
    });

    if (!signatureResponse.ok) {
      throw new Error("Unable to generate Cloudinary upload signature");
    }

    const signatureData =
      (await signatureResponse.json()) as CloudinarySignatureResponse;

    if (!signatureData.cloudName || !signatureData.apiKey) {
      throw new Error("Missing Cloudinary cloud name or API key");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signatureData.apiKey);
    formData.append("timestamp", String(signatureData.timestamp));
    formData.append("signature", signatureData.signature);
    formData.append("folder", signatureData.folder);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!uploadResponse.ok) {
      const uploadError = await uploadResponse.json().catch(() => null);
      const uploadErrorMessage =
        uploadError?.error?.message || "Failed to upload file to Cloudinary";
      throw new Error(uploadErrorMessage);
    }

    const uploadData = await uploadResponse.json();

    return {
      url: uploadData.url,
      secureUrl: uploadData.secure_url,
      publicId: uploadData.public_id,
      resourceType: uploadData.resource_type,
      originalFilename: uploadData.original_filename,
    };
  };

  const onSubmit = async function (data: TCapsuleSchema) {
    try {
      await checkSession("You need to be logged in to create a capsule.");

      const filesToUpload = data.files ?? [];
      let uploadedAssets: UploadedAsset[] = [];

      if (filesToUpload.length > 0) {
        toast.loading("Uploading files to Cloudinary...", {
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
        ...data,
        files: uploadedAssets.map((file) => ({
          url: file.secureUrl,
          publicId: file.publicId,
          fileType: file.resourceType,
        })),
      };

      const capsuleCreationResponse = await CreateCapsuleAction(payload);

      if (!capsuleCreationResponse.success) {
        toast.error("Failed to create a capsule. Try again.");
        return;
      }

      toast.success("Capsule created successfully.");
      reset();
      router.push("/dashboard")
     
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "File upload failed";
      toast.error(message, {
        id: "cloudinary-upload",
      });
      console.error("Cloudinary upload failed:", error);
    }
  };

  return (
    <div className="min-h-[90vh] mx-auto max-w-3xl md:min-h-[85vh] lg:min-h-[80vh]">
      <div className="max-w-fit mt-4">
        {/* Back to dashboard */}
        <Link
          href={"/dashboard"}
          className="text-sm text-text-secondary hover:text-primary transition-colors duration-200 text-center w-full"
        >
          <div className="flex items-center mt-8 justify-center gap-2 text-lg font-medium text-primary hover:text-[#3b62fb]">
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </div>
        </Link>
      </div>

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
              <label className="font-semibold text-lg mb-2">
                Capsule Content
              </label>
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

          <div>
            <CardComponent count={5} title="Password">
              <label
                htmlFor="capsulePassword"
                className="font-semibold text-lg flex items-center gap-1"
              >
                Capsule password
                <p className="text-sm text-gray-500 mb-2">(Optional)</p>
              </label>
              <input
                id="capsulePassword"
                type="password"
                {...register("capsulePassword")}
                placeholder="****"
                autoComplete="current-password"
                className="h-10 py-4 px-3 font-semibold border border-gray-500 rounded bg-gray-800 outline-none focus:border-gray-300"
              />
              {errors.capsulePassword && (
                <ErrorContainer message={errors.capsulePassword.message} />
              )}
            </CardComponent>
          </div>

          <div className="mb-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 w-full text-lg font-semibold rounded-md cursor-pointer "
            >
              Create Capsule
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreatePage;
