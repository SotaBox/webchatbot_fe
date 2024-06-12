export const columns = [
  { name: "ID", uid: "id" },
  { name: "URL", uid: "url" },
  { name: "CONTENT", uid: "content" },
  { name: "VECTOR", uid: "vector" },
  { name: "ACTIONS", uid: "actions" },
];

export interface ISiteMap {
  id: number;
  url: string;
  content: string;
  vectorStatus: boolean;
}

interface ISiteMaps {
  siteMaps: ISiteMap[];
}

export const siteMaps: ISiteMaps = {
  siteMaps: [
    {
      id: 1,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vectorStatus: true,
    },
    {
      id: 2,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vectorStatus: true,
    },
    {
      id: 3,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vectorStatus: true,
    },
    {
      id: 4,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vectorStatus: true,
    },
    {
      id: 5,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vectorStatus: true,
    },
    {
      id: 6,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vectorStatus: true,
    },
    {
      id: 7,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vectorStatus: true,
    },
    {
      id: 8,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vectorStatus: true,
    },
    {
      id: 9,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vectorStatus: true,
    },
    {
      id: 10,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vectorStatus: true,
    },
  ],
};

export default { columns, siteMaps };
