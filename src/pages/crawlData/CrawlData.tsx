import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  ChipProps,
} from "@nextui-org/react";
import { EditIcon } from "./icons";
import { DeleteIcon } from "./icons";
import { EyeIcon } from "./icons";
import { columns, ISiteMap, siteMaps } from "./data";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type SiteMap = (typeof siteMaps)[0];

function CrawlData() {
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
              <div className="text-black">{cellValue}</div>
            </div>
          );
        case "content":
          return (
            <div>
              <div className="text-black">{cellValue}</div>
            </div>
          );
        case "vector":
          return (
            <div>
              <div className="text-black">{cellValue}</div>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[siteMap.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit Sitemap">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Sitemap">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
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
      <section>
        <div className="max-w-4xl mx-4 my-2">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-row space-x-3 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 absolute left-6 top-3 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <input
                type="text"
                placeholder="Search ..."
                className="p-2 pl-10 pr-28 border border-slate-300 rounded-lg focus:outline-none"
              />
            </div>
            <button className="p-2 bg-blue-500 text-white rounded-xl hover:opacity-90 hover:-translate-y-0 transaction duration-500">
              Add URL
            </button>
          </div>
        </div>
        <div className="max-w-md lg:max-w-4xl h-[600px] overflow-auto mx-auto">
          <Table aria-label="Example table with custom cells">
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
