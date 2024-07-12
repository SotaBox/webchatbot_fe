import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import axiosRequest from "src/axiosManager/axiosRequest";

export default function TestAPI() {
  const fetchProfileUser = async () => {
    await axiosRequest
      .post("/crawl/crawl-sitemap", {
        parent_link: "https://vnexpress.net/the-thao",
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        toast.error("Get api server failed !!!");
      });
  };

  const getDataFromLink = async () => {
    await axiosRequest
      .get("/crawl/get-sitemap?parent_link=https://vnexpress.net/the-thao")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        toast.error("Get api server failed !!!");
      });
  };

  const fetchProfileUser2 = async () => {
    await axiosRequest
      .post("/crawl/crawl-data-from-link", {
        id: 133,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        toast.error("Get api server failed !!!");
      });
  };

  const getDataFromLink2 = async () => {
    await axiosRequest
      .get("/crawl/get-data-from-link?id=133")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        toast.error("Get api server failed !!!");
      });
  };

  return (
    <>
      <div className="mt-40">
        <Button onClick={() => fetchProfileUser()}>Crawl sitemap</Button>
        <Button onClick={() => getDataFromLink()}>Get list link</Button>
        <Button onClick={() => fetchProfileUser2()}>Crawl link</Button>
        <Button onClick={() => getDataFromLink2()}>get data link</Button>
      </div>
    </>
  );
}
