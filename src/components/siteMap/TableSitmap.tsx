import {
  getKeyValue,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Key, useCallback, useState } from "react";
import axiosRequest from "src/axiosManager/axiosRequest";
import { Selection } from "@react-types/shared";
import GetSitemap from "src/types/sitemap/GetSitemap";
export default function TableSitmap() {
  const [selectedColor, setSelectedColor] = useState("default");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const rows = [
    {
      id: "22",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      id: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      id: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      id: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];
  const columns = [
    {
      id: "name",
      label: "NAME",
    },
    {
      id: "role",
      label: "ROLE",
    },
    {
      id: "status",
      label: "STATUS",
    },
  ];
  const [siteMaps, setSiteMaps] = useState<Array<GetSitemap>>([
    { id: "11", url: "http://laodong.vn" },
    { id: "22", url: "http://laodong.vn" },
    { id: "33", url: "http://laodong.vn" },
    { id: "44", url: "http://laodong.vn" },
    { id: "55", url: "http://laodong.vn" },
    { id: "62", url: "http://laodong.vn" },
    { id: "73", url: "http://laodong.vn" },
    { id: "85", url: "http://laodong.vn" },
    { id: "96", url: "http://laodong.vn" },
    { id: "12", url: "http://laodong.vn" },
    { id: "41", url: "http://laodong.vn" },
    { id: "52", url: "http://laodong.vn" },
  ]);
  type SiteMaps = (typeof siteMaps)[0];
  //   const columns = [
  //     { name: "ID", uid: "id" },
  //     { name: "URL", uid: "url" },
  //   ];
  const renderCell = useCallback((siteMaps: SiteMaps, columnKey: Key) => {
    const cellValue = siteMaps[columnKey as keyof SiteMaps];
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
      default:
        return cellValue;
    }
  }, []);
  return (
    // <Table aria-label="Example table with custom cells">
    //   <TableHeader columns={columns}>
    //     {(column) => (
    //       <TableColumn
    //         key={column.uid}
    //         align={column.uid === "actions" ? "center" : "start"}
    //       >
    //         {column.name}
    //       </TableColumn>
    //     )}
    //   </TableHeader>

    //   <TableBody
    //     loadingContent={<Spinner size="lg" />}
    //     emptyContent={"No links to display."}
    //   >
    //     {(item: GetSitemap) => (
    //       <TableRow key={item.id}>
    //         {(columnKey) => (
    //           <TableCell>{renderCell(item, columnKey)}</TableCell>
    //         )}
    //       </TableRow>
    //     )}
    //   </TableBody>
    // </Table>
    <>
      <Table
        aria-label="Controlled table example with dynamic content"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.id}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p>select checkbox is {selectedKeys}</p>
      <p>Get name by id {rows.filter((item) => item.id === "11")}</p>
    </>
  );
}
