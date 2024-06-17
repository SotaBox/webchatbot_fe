import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  ChipProps,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
  Input,
} from "@nextui-org/react";
import { columns, ISiteMap, siteMaps } from "./data";
import { DeleteIcon, EditIcon } from "./icons";
import { SubmitHandler, useForm } from "react-hook-form";

const statusColorMap: Record<string, ChipProps["color"]> = {
  success: "success",
  failed: "danger",
};

type SiteMap = (typeof siteMaps)[0];

function CrawlData() {
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
    console.log("Input url", data);
    modalCreate.onClose();
  };
  const modalEdit = useDisclosure();
  const modalDelete = useDisclosure();
  const modalCreate = useDisclosure();

  // const urls = useAppSelector((state: RootState) => state.url.urls);
  // console.log("URL data:", urls);
  const renderCell = React.useCallback(
    (siteMap: SiteMap, columnKey: React.Key) => {
      const cellValue = siteMap[columnKey as keyof SiteMap];

      switch (columnKey) {
        case "id":
          return (
            <div>
              <div className="text-black">{cellValue}</div>
            </div>
          );
        case "url":
          return (
            <div>
              <div className="text-black text-overflow: ellipsis">
                {cellValue}
              </div>
            </div>
          );
        case "content":
          return (
            <div>
              <div className="">{cellValue}</div>
            </div>
          );
        case "vector":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[siteMap.vector]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit Content">
                <span
                  onClick={modalEdit.onOpen}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete URL">
                <span
                  onClick={modalDelete.onOpen}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <Modal isOpen={modalEdit.isOpen} onOpenChange={modalEdit.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Delete SiteMap
              </ModalHeader>
              <ModalBody>
                Are you sure delete url `https://laodong.vn/` ?
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={modalEdit.onClose}
                >
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={modalDelete.isOpen}
        onOpenChange={modalDelete.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Delete URL
              </ModalHeader>
              <ModalBody>
                Are you sure delete url `https://laodong.vn/` ? modal 2
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

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

      <section>
        <div className="max-w-6xl mx-auto flex flex-col my-8 px-4">
          <div className="flex flex-row space-x-6 items-center justify-between">
            <div className="text-3xl font-bold">Table Crawl Data</div>
            <button
              onClick={modalCreate.onOpen}
              className="flex flex-row space-x-2 bg-sky-600 p-2 px-5 rounded-xl hover:opacity-90 hover:shadow-lg shadow-sm transition duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-white font-bold">Create New URL</div>
            </button>
          </div>
          <Table aria-label="Example table with custom cells" className="my-4">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={siteMaps.siteMaps}>
              {(item: ISiteMap) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}

export default CrawlData;
