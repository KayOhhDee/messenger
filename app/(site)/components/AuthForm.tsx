"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";

type Variant = "signin" | "signup";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("signin");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "signin" ? "signup" : "signin"));
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    
    if (variant === "signin") {
      // Sign in logic
    } 
    
    if (variant === "signup"){
      try {
        const response = await axios.post("/api/register", data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    setIsLoading(false);
  }

  const socialAction = (action: string) => {
    setIsLoading(true);
    // Social login logic
    setIsLoading(false);
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {
            variant === "signup" && (
              <Input id="name" label="Name" register={register} errors={errors} />
            )
          }
          <Input id="email" label="Email address" type="email" register={register} errors={errors} />
          <Input id="password" label="Password" type="password" register={register} errors={errors} />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "signin" ? "Sign in" : "Sign up"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
          </div>
        </div>

        <div className="flex justify-center text-sm gap-2 mt-6 px-2 text-gray-500">
          <div>
            {variant === "signin" ? "Don't have an account?" : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "signin" ? "Create an account" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
 