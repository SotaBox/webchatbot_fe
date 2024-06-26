import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
interface IProps {
  modalCreate: {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
  };
}
export default function CreateUrlModal({ modalCreate }: IProps) {
  type FormField = {
    url: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormField>();
  const onSubmit: SubmitHandler<FormField> = async (data: FormField) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Input url from modal", data);
    modalCreate.onClose();
  };
  return (
    <Modal
      isOpen={modalCreate.isOpen}
      onOpenChange={modalCreate.onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create New URL
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  disabled={isSubmitting}
                  className="font-bold"
                  autoFocus
                  startContent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                      />
                    </svg>
                  }
                  placeholder="Enter your url"
                  variant="bordered"
                  {...register("url", {
                    required: {
                      value: true,
                      message: "URL is required",
                    },
                    pattern: {
                      value:
                        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                      message: "URL is invalid format",
                    },
                  })}
                  description={
                    errors.url && (
                      <p className="text-red-500 text-xs">
                        {errors.url.message}
                      </p>
                    )
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button disabled={isSubmitting} type="submit" color="primary">
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
                    "Create"
                  )}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
