import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PAGE } from "src/constants/router";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosRequest from "src/axiosManager/axiosRequest";
import RegisterRequest from "src/types/auth/RegisterRequest";

function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
  const schema = z
    .object({
      username: z
        .string()
        .min(8, { message: "Username must be at least 8 characters" }),
      email: z.string().email({ message: "Email must be a valid email" }),
      password: z
        .string({ message: "Passwork must be required" })
        .regex(passwordValidation, {
          message:
            "Password must contain at least one uppercase, one lowercase, one number and one special character",
        }),
      confirm: z
        .string({ message: "Confirm password must be required" })
        .regex(passwordValidation, {
          message:
            "Password must contain at least one uppercase, one lowercase, one number and one special character",
        }),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"],
    });
  type FormField = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    resolver: zodResolver(schema),
  });
  const nagative = useNavigate();
  const onSubmit: SubmitHandler<RegisterRequest> = async (
    data: RegisterRequest
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    axiosRequest
      .post("/auth/register", {
        username: data.username,
        password: data.password,
        email: data.email,
      })
      .then((response) => {
        console.log("Respone data server: ", response.data);
        toast.success("Register Suucessfull");
        nagative(PAGE.LOGIN);
      })
      .catch((errors) => {
        toast.error("Register failed !!!");
      });
  };

  return (
    <>
      <section className="flex items-center justify-center min-h-screen bg-white">
        <div className="container max-w-md p-8 bg-white ">
          <div className="my-10 text-black text-3xl font-bold text-center">
            Register
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              autoFocus
              label="Username"
              labelPlacement="outside"
              className="font-bold"
              type="text"
              placeholder="Enter your username"
              variant="bordered"
              description={
                errors.username && (
                  <p className="text-red-500 text-xs">
                    {errors?.username?.message}
                  </p>
                )
              }
              {...register("username")}
            />

            <Input
              label="Email"
              labelPlacement="outside"
              className="font-bold"
              type="text"
              placeholder="Enter your email"
              variant="bordered"
              description={
                errors.email && (
                  <p className="text-red-500 text-xs">
                    {errors?.email?.message}
                  </p>
                )
              }
              {...register("email")}
            />
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-2xl font-bold"
              description={
                errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors?.password?.message}
                  </p>
                )
              }
              {...register("password")}
            />
            <Input
              label="Confirm Password"
              labelPlacement="outside"
              placeholder="Enter your confirm password"
              variant="bordered"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityConfirm}
                >
                  {isVisibleConfirm ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              }
              type={isVisibleConfirm ? "text" : "password"}
              className="max-w-2xl font-bold"
              description={
                errors.confirm && (
                  <p className="text-red-500 text-xs">
                    {errors.confirm?.message}
                  </p>
                )
              }
              {...register("confirm")}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="text-white text-md font-bold bg-sky-700 py-6"
            >
              {isSubmitting ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 animate-spin"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Loading ...
                </>
              ) : (
                "Register"
              )}
            </Button>
            <div className="text-center my-3 flex flex-row space-x-3 items-center justify-center">
              <div className="text-gray-400 capitalize">
                Already have an account ?
              </div>
              <Link
                to={PAGE.LOGIN}
                className=" text-sky-500 hover:opacity-60 duration-500"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
