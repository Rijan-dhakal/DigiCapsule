"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CapsuleSchema, TCapsuleSchema } from "@/lib/validators/capsules";
import CardComponent from "./card-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreatePage = () => {
  const {
    register,
    handleSubmit,
    control,
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
            <CardComponent count={1} title="The Basics">
              <label htmlFor="input" className="font-semibold text-lg">
                Capsule Title
              </label>
              <input
                id="input"
                type="text"
                {...register("title")}
                placeholder="Trip to nepal"
                className="h-10 py-4 px-3 font-semibold border border-gray-500 rounded bg-gray-800 outline-none focus:border-gray-300"
              />
            </CardComponent>
          </div>

          {/* Markdown for content */}
          <div>
            <CardComponent count={2} title="The Memory">
              <p>Implement markdown here with file uploads</p>
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
              </div>

              <div className="mt-8 flex flex-col space-y-2">
                <label htmlFor="hint" className="space-x-1">
                  <span className="font-semibold">Hint for Receiver</span>

                  <span className="text-sm text-gray-500 mr-2">(Optional)</span>
                </label>
                <input
                  id="hint"
                  type="email"
                  {...register("hint")}
                  placeholder="eg. Graduation day"
                  className="h-10 py-4 px-3 font-semibold border border-gray-500 rounded bg-gray-800 outline-none focus:border-gray-300"
                />
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
                type="text"
                {...register("recipientEmail")}
                placeholder="person@example.com"
                className="h-10 py-4 px-3 font-semibold border border-gray-500 rounded bg-gray-800 outline-none focus:border-gray-300"
              />
            </CardComponent>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreatePage;
