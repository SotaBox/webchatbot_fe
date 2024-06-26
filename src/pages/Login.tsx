import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LoginRequest from "src/types/auth/LoginRequest";
import { authActions, useAppDispatch } from "src/store";
import { Link, useNavigate } from "react-router-dom";
import { PAGE } from "src/constants/router";
import { toast } from "sonner";
import axiosRequest from "src/axiosManager/axiosRequest";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    defaultValues: {
      username: "thangngo123468",
      password: "Nguoitinhmuadong712@minnnn",
    },
  });
  const nagative = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<LoginRequest> = async (data: LoginRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    axiosRequest
      .post("/auth/login", {
        username: data.username?.toString(),
        password: data.password?.toString(),
      })
      .then((response) => {
        dispatch(
          authActions.login({
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
          })
        );
        nagative(PAGE.CRAWL_DATA);
        toast.success("Login successfull <3");
      })
      .catch((errors) => {
        toast.error("Login failed !!!");
      });
  };
  return (
    <>
      <section className="flex items-center justify-center min-h-screen bg-white">
        <div className="container max-w-md p-8 bg-white ">
          <div className="flex flex-row space-x-1 my-10 justify-center">
            <span className="text-4xl font-bold">ChatBot</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              autoFocus
              disabled={isSubmitting}
              label="Username"
              labelPlacement="outside"
              className="font-bold"
              type="text"
              placeholder="Enter your username"
              variant="bordered"
              description={
                errors.username && (
                  <p className="text-red-500 text-xs">
                    Username must be required
                  </p>
                )
              }
              {...register("username", { required: true })}
            />

            <Input
              disabled={isSubmitting}
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
                  <p className="text-red-500 text-xs">Password is required</p>
                )
              }
              {...register("password", {
                required: true,
              })}
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
                "Log In"
              )}
            </Button>
            <div className="text-center my-3 flex flex-row space-x-3 items-center justify-center">
              <div className="text-gray-400 capitalize">
                Don't Have An Account ?
              </div>
              <Link
                to={PAGE.REGISTER}
                className=" text-sky-500 hover:opacity-60 duration-500"
              >
                Register Now
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
