import GetSitemap from "src/types/sitemap/GetSitemap";
import { store } from "../store";
import { siteMapActions } from "./reducer";

export const ReduxSitemap = {
  createSitemap: (sitemap: Array<GetSitemap>) => {
    store.dispatch(siteMapActions.getSitemap(sitemap));
  },
  clearSitemap: () => {
    store.dispatch(siteMapActions.clearSitemap());
  },
};
