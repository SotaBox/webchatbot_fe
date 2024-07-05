import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { columns } from "./Columns";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { DeleteIcon, EditIcon } from "src/pages/crawlData/icons";
import IGetUrl from "src/types/url/GetUrl";
import { toast } from "sonner";
import axiosRequest from "src/axiosManager/axiosRequest";

interface IProps {
  modalEdit: {
    onOpen: () => void;
  };
  modalDelete: {
    onOpen: () => void;
  };
}
const statusOptions = [
  { name: "Success", uid: "success" },
  { name: "Fail", uid: "fail" },
  { name: "Inprogress", uid: "inprogress" },
  { name: "Null", uid: "null" },
];
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export default function TableCrawlData({ modalEdit, modalDelete }: IProps) {
  const [urls, seturls] = useState<Array<IGetUrl>>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loadingState = loading ? "loading" : "idle";
  const rowsPerPage = 6;
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);
  const [statusFilter, setStatusFilter] = useState("all");
  const statusColorMap: Record<string, ChipProps["color"]> = {
    success: "success",
    fail: "danger",
    inprogress: "warning",
    null: "default",
  };
  const fetchUrls = async () => {
    try {
      setLoading(true);
      const data = await axiosRequest.get(
        "/chat/get_list_url?url=http/laodong"
      );
      seturls(data.data);
      console.log("fetch data url", data.data);
    } catch (error) {
      toast.error("Api get url error message");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUrls();
  }, []);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...urls];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.url.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.vector_status)
      );
    }
    return filteredUsers;
  }, [urls, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, urls, filteredItems]);

  type Urls = (typeof urls)[0];
  const renderCell = useCallback((urls: Urls, columnKey: Key) => {
    const cellValue = urls[columnKey as keyof Urls];
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
      case "description":
        return (
          <div>
            <div className="">{cellValue}</div>
          </div>
        );
      case "vector_status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[urls.vector_status]}
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
  }, []);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-1 md:gap-3">
          <Input
            isClearable
            variant="bordered"
            className="w-[47%] sm:max-w-[44%] bg-white rounded-xl"
            placeholder="Search by url..."
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            }
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <Dropdown>
            <DropdownTrigger className=" sm:flex">
              <Button
                className="bg-white "
                endContent={
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
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                }
                variant="flat"
              >
                Vector Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }, [filterValue, statusFilter, onSearchChange, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells"
      topContentPlacement="outside"
      topContent={topContent}
      bottomContent={
        pages > 1 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      className="my-4"
    >
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

      <TableBody
        loadingContent={<Spinner size="lg" />}
        loadingState={loadingState}
        emptyContent={"No rows to display."}
        items={items}
      >
        {(item: IGetUrl) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
