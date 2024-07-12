import imageBackground from "../images/Remote-Work-Download-PNG-Image.png";
import { createContext, useState } from "react";
import TableSitmap from "src/components/siteMap/TableSitmap";

import SitemapInput from "src/components/siteMap/SitemapInput";
export const SiteMapContext = createContext({
  url: "",
  setUrl: (url: string) => {},
});
export default function SiteMap() {
  const [url, setUrl] = useState<string>("");
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
      <SiteMapContext.Provider value={{ url, setUrl }}>
        <section className="relative bg-gray-100 mb-12">
          <div className="max-w-4xl mx-auto p-6 space-y-3">
            <SitemapInput />
            <div className="flex flex-col items-center justify-between w-full md:flex-row gap-4">
              <TableSitmap />
            </div>
          </div>
        </section>
      </SiteMapContext.Provider>
    </>
  );
}
