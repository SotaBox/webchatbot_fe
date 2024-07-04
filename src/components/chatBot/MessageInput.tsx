import { Button, Input, Spinner } from "@nextui-org/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import axiosRequest from "src/axiosManager/axiosRequest";
import { LoadingContext } from "src/pages/ChatBot";
import { ReduxMessages } from "src/store/messages/reduxMessages";

export default function MessageInput() {
  const loading = useContext(LoadingContext);
  type FormField = {
    messageUser: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isSubmitting },
  } = useForm<FormField>();
  interface MessData {
    message: string;
  }
  const [value, setValue] = useState("");
  // const [focusInput, setFocusInput] = useState(false);
  const onSubmit: SubmitHandler<FormField> = async (dataInput: FormField) => {
    try {
      ReduxMessages.createMessageUser(dataInput.messageUser);
      loading.setLoading(true);
      const data = await axiosRequest.post(
        "https://mpec2b68ed6201d6cc96.free.beeceptor.com/send-message",
        {
          message: dataInput,
        }
      );
      const dataMess: MessData = data.data;
      ReduxMessages.createMessageBot(dataMess.message);
    } catch (error) {
      toast.error("Api error message");
    } finally {
      reset();
      // setFocusInput(true);
      loading.setLoading(false);
    }
  };
  useEffect(() => {
    setFocus("messageUser");
  }, [loading]);

  const checkEmpty = useCallback(
    (input: string | undefined): boolean | void => {
      if (input === "") {
        return true;
      } else {
        return false;
      }
    },
    []
  );
  return (
    <form
      className="flex space-x-2 p-4 "
      onSubmit={isSubmitting ? () => {} : handleSubmit(onSubmit)}
    >
      <Input
        autoFocus
        disabled={isSubmitting}
        type="text"
        placeholder="Enter your question"
        variant="bordered"
        value={value}
        onValueChange={setValue}
        {...register("messageUser", { required: true })}
      />

      {checkEmpty(value) ? (
        <Button disabled className="p-2 bg-slate-300 cursor-not-allowed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </Button>
      ) : (
        <Button disabled={isSubmitting} type="submit" className="p-2 bg-black">
          {isSubmitting ? (
            <Spinner color="default" size="sm" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          )}
        </Button>
      )}
    </form>
  );
}
