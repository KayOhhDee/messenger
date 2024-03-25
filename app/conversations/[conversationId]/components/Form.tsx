"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      message: ""
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setValue("message", "", { shouldValidate: true })

    try {
      axios.post('/api/messages', {
        ...data,
        conversationId
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleUploadSuccess = (result: any) => {
    try {
      axios.post('/api/messages', {
        image: result?.info?.secure_url,
        conversationId
      });
    } catch (error) {
      console.error(error);
    }
  }

  return ( 
    <div
      className="flex items-center p-4 border-t bg-white gap-2 lg:gap-4 w-full"
    >
      <CldUploadButton 
        options={{ maxFiles: 1 }}
        onSuccess={handleUploadSuccess}
        uploadPreset="dmuirbni"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message" />
        <button type="submit" className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition">
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}
 
export default Form;