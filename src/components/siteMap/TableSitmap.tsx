import {
  getKeyValue,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useContext, useEffect, useMemo, useState } from "react";
import axiosRequest from "src/axiosManager/axiosRequest";
import { Selection } from "@react-types/shared";
import { toast } from "sonner";
import { SiteMapContext } from "src/pages/SiteMap";
import { ReduxSitemap } from "src/store/siteMap";
import { useAppSelector } from "src/store";
export default function TableSitmap() {
  const url = useContext(SiteMapContext);
  const [loading, setLoading] = useState(false);
  const loadingState = loading ? "loading" : "idle";
  const sitemap = useAppSelector((state) => state.sitemap);
  const fetchSitemap = async () => {
    if (url.url === "") return;
    try {
      setLoading(true);
      const data = await axiosRequest.get(
        `/crawl/get-sitemap?parent_link=${url.url}`
      );
      ReduxSitemap.createSitemap(data.data);
    } catch (error) {
      toast.error("Get api list urls server failed !!!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSitemap();
  }, [url]);

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "link",
      label: "LINK",
    },
  ];
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(sitemap.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sitemap.slice(start, end);
  }, [page, sitemap]);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const handleSubmit = async () => {
    try {
      console.log("select url", selectedKeys);
    } catch (error) {
      toast.error("Get api post send urls failed !!!");
    } finally {
    }
  };
  return (
    <>
      <Table
        hideHeader
        aria-label="Controlled table example with dynamic content"
        selectionMode="multiple"
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
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          loadingContent={<Spinner size="lg" />}
          loadingState={loadingState}
          emptyContent={"No links to display."}
          items={items}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
