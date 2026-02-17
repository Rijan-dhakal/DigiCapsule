"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CapsuleSchema, TCapsuleSchema } from "@/lib/validators/capsules";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardComponent from "./card-component";

const CreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCapsuleSchema>({
    resolver: zodResolver(CapsuleSchema),
  });

  const onSubmit = function () {};

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

      {/* Title */}
      <div className="mt-4 overflow-y-scroll">
        <form
          id="form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          <div>
            <CardComponent count={1} register={register} title="The Basics">
              <label htmlFor="input" className="font-semibold text-lg">
                Capsule Title
              </label>
              <input
                id="input"
                type="text"
                {...register("title")}
                placeholder="Trip to nepal"
                className="h-10 py-3 px-3 text-lg font-semibold border border-gray-500 rounded bg-gray-800 outline-none focus:border-gray-300"
              />
            </CardComponent>
          </div>

          {/* Markdown for content */}
          <div>
            <CardComponent count={2} register={register} title="The Memory">
              <p>Implement markdown here with file uploads</p>
            </CardComponent>
          </div>

          {/* Unlock date and time */}
        </form>
      </div>
    </div>
  );
};
export default CreatePage;
