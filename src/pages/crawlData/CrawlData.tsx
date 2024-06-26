import { useDisclosure } from "@nextui-org/react";
import { useAppSelector } from "src/store";
import CreateUrlModal from "src/components/crawlData/CreateUrlModal";
import EditContentModal from "src/components/crawlData/EditContentModal";
import DeleteUrlModal from "src/components/crawlData/DeleteUrlModal";
import TableCrawlData from "src/components/crawlData/TableCrawlData";
import HeaderTableCrawlData from "src/components/crawlData/HeaderTableCrawlData";

function CrawlData() {
  const modalEdit = useDisclosure();
  const modalDelete = useDisclosure();
  const modalCreate = useDisclosure();
  const urls = useAppSelector((state) => state.url);
  return (
    <>
      <EditContentModal modalEdit={modalEdit} />
      <DeleteUrlModal modalDelete={modalDelete} />
      <CreateUrlModal modalCreate={modalCreate} />
      <section>
        <div className="max-w-6xl mx-auto flex flex-col my-8 px-4">
          <HeaderTableCrawlData modalCreate={modalCreate} />
          <TableCrawlData
            modalEdit={modalEdit}
            modalDelete={modalDelete}
            urls={urls}
          />
        </div>
      </section>
    </>
  );
}

export default CrawlData;
