import {
  Button,
  Checkbox,
  CheckboxGroup,
  ScrollShadow,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import imageBackground from "../images/Remote-Work-Download-PNG-Image.png";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TableSitmap from "src/components/siteMap/TableSitmap";
import GetSitemap from "src/types/sitemap/GetSitemap";
const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];
export default function SiteMap() {
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

    console.log("Input url from modal", data);
    setIsCrawled(true);
  };
  const [selectedColor, setSelectedColor] = useState("default");
  const [isCrawled, setIsCrawled] = useState(false);
  const [selected, setSelected] = useState<Array<string>>([]);

  return (
    <>
      <section className="bg-white">
        <div className="container flex flex-col mx-auto p-6 lg:flex-row lg:gap-4">
          <div className="mb-20 mx-auto md:w-180 lg:mb-0 lg:w-1/2">
            <img src={imageBackground} alt="" />
          </div>
          <div className="flex flex-col space-y-10 mb-40  lg:mt-16 lg:w-1/2 xl:mb-52 lg:items-center">
            <h1 className="text-5xl font-bold text-center lg:text-6xl lg:max-w-xl lg:text-left">
              The best website for crawl data
            </h1>
            <p className="text-2xl text-center text-gray-400 lg:max-w-xl lg:text-left">
              The most trusted choice for users, promising to bring an extremely
              wonderful, classy and luxurious experience
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-gray-100">
        <div className="max-w-4xl mx-auto p-6 space-y-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex flex-col w-full p-7 -mt-20 space-y-4 bg-slate-700 rounded-lg md:flex-row md:space-y-0 md:space-x-3"
          >
            <input
              type="text"
              className="flex-1 p-3 border-2 rounded-lg focus:outline-none"
              placeholder="Enter URL"
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
            <button
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
            </button>
          </form>
          <div className="flex flex-col items-center justify-between w-full  md:flex-row gap-4">
            {/* {isCrawled ? (
              <>
                <ScrollShadow className="w-full h-[10rem]">
                  <CheckboxGroup
                    value={selected}
                    onValueChange={setSelected}
                    size="lg"
                  >
                    <Checkbox value="https://laodong.com/">
                      https://laodong.com
                    </Checkbox>
                    <Checkbox value="https://thethao.com">
                      https://thethao.com
                    </Checkbox>
                    <Checkbox value="https://vanhoa.com">
                      https://vanhoa.com
                    </Checkbox>
                    <Checkbox value="https://laodong.com/">
                      https://laodong.com
                    </Checkbox>
                    <Checkbox value="https://thethao.com">
                      https://thethao.com
                    </Checkbox>
                    <Checkbox value="https://vanhoa.com">
                      https://vanhoa.com
                    </Checkbox>
                    <Checkbox value="https://laodong.com/">
                      https://laodong.com
                    </Checkbox>
                    <Checkbox value="https://thethao.com">
                      https://thethao.com
                    </Checkbox>
                    <Checkbox value="https://vanhoa.com">
                      https://vanhoa.com
                    </Checkbox>
                  </CheckboxGroup>
                </ScrollShadow>
                <Button
                  isDisabled={selected.length === 0}
                  className="lg:w-1/6 w-full"
                  color="primary"
                >
                  Crawl Data
                </Button>
              </>
            ) : (
              <div className="text-md text-gray-500">No Data</div>
            )} */}
            <TableSitmap />
          </div>
        </div>
      </section>
    </>
  );
}
