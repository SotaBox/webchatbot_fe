import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import axiosRequest from "src/axiosManager/axiosRequest";

export default function TestAPI() {
  const fetchProfileUser = async () => {
    await axiosRequest
      .post("/crawl/crawl-sitemap", {
        url: "https://laodong.vn/",
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
      .get("/crawl/get-list-link/url=`https://laodong.vn/xe`")
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
        <Button onClick={() => fetchProfileUser()}>
          Crawl Link to sitemap
        </Button>
        <Button onClick={() => getDataFromLink()}>
          Get Data from one link
        </Button>
      </div>
    </>
  );
}
