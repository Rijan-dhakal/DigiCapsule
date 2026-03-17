import { UploadedAsset } from "@/lib/types/types";

 interface CloudinarySignatureResponse {
  signature: string;
  timestamp: number;
  folder: string;
  cloudName: string;
  apiKey: string;
}
 
 export const uploadToCloudinary = async (file: File): Promise<UploadedAsset> => {
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