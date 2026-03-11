import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { timestamp } = await request.json();

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: "digicapsule",
      },
      process.env.CLOUDINARY_API_SECRET as string,
    );

    return NextResponse.json({
      signature,
      timestamp,
    });

  } catch (error: any) {
    console.error("Error while generating cloudinary signature");
    console.error(error.message);
    return NextResponse.json(
      {
        error: "Failed to generate signature",
      },
      { status: 500 },
    );
  }
}
