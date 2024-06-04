import { EyeDropperIcon, EyeIcon } from "@heroicons/react/16/solid";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LoginRequest from "src/types/auth/LoginRequest";
import { toast } from "sonner";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    },
  });
  const onSubmit: SubmitHandler<LoginRequest> = (data: LoginRequest) => {
    toast.loading("Loading...");
    axios
      .post(`https://reqres.in/api/login`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          window.location.reload();
        }
      })
      .catch(() => {
        toast.error("Email or Password is wrong");
      });
  };
  return (
    <>
      <section className="flex items-center justify-center">
        <div className="container max-w-sm mt-12 p-8 bg-white shadow-xl rounded-xl">
          <div className="text-black text-3xl font-medium">Log In</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-8"
          >
            <Input
              label="Email"
              labelPlacement="outside"
              className="mt-4"
              type="text"
              placeholder="Enter your email"
              variant="bordered"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500">Email must be required</p>
            )}
            <Input
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              variant="bordered"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeDropperIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-2xl"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500">Password must be required</p>
            )}
            <Button type="submit" className="text-base" color="primary">
              Log In
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
