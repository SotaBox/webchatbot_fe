import { Button, Input } from "@nextui-org/react";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import axiosRequest from "src/axiosManager/axiosRequest";
import { SiteMapContext } from "src/pages/SiteMap";
import { ReduxSitemap } from "src/store/siteMap";

export default function SitemapInput() {
  const url = useContext(SiteMapContext);
  type FormField = {
    url: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormField>();
  const onSubmit: SubmitHandler<FormField> = async (data: FormField) => {
    if (url.url === data.url) return;
    ReduxSitemap.clearSitemap();
    try {
      await axiosRequest.post("/crawl/crawl-sitemap", {
        parent_link: data.url,
      });
    } catch (error) {
      toast.error("Get api Crawl sitemap server failed !!!");
    } finally {
      url.setUrl(data.url);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col w-full p-7 -mt-20 space-y-4 bg-slate-700 rounded-lg md:flex-row md:space-y-0 md:space-x-3"
      >
        <Input
          type="text"
          className="flex-1 focus:outline-none"
          placeholder="Enter URL"
          description={
            errors.url && (
              <p className="text-red-500 font-bold">{errors.url.message}</p>
            )
          }
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
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          className="px-10 py-2 text-white font-bold bg-black rounded-lg hover:bg-slate-300 shadow-sm hover:shadow-md hover:text-black hover:duration-700 focus:outline-none md:p-2 md:px-4"
        >
          {isSubmitting ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 animate-spin"
              >
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          ) : (
            "Crawl"
          )}
        </Button>
      </form>
    </>
  );
}
