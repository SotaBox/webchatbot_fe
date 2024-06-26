import {
  Chip,
  ChipProps,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { columns } from "./Columns";
import { IUrl, initialState } from "src/store/urls";
import { Key, useCallback } from "react";
import { DeleteIcon, EditIcon } from "src/pages/crawlData/icons";

interface IProps {
  urls: IUrl[];
  modalEdit: {
    onOpen: () => void;
  };
  modalDelete: {
    onOpen: () => void;
  };
}
export default function TableCrawlData({
  urls,
  modalEdit,
  modalDelete,
}: IProps) {
  const statusColorMap: Record<string, ChipProps["color"]> = {
    success: "success",
    failed: "danger",
  };

  type Urls = (typeof initialState)[0];
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
            color={statusColorMap[urls.vector]}
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
  return (
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
      <TableBody items={urls}>
        {(item: IUrl) => (
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
