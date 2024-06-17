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
  vector: string;
}

interface ISiteMaps {
  siteMaps: ISiteMap[];
}

export const siteMaps: ISiteMaps = {
  siteMaps: [
    {
      id: 1,
      url: "https://laodong.vn/",
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      vector: "success",
    },
    {
      id: 2,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vector: "failed",
    },
    {
      id: 3,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vector: "failed",
    },
    {
      id: 4,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vector: "success",
    },
    {
      id: 5,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vector: "success",
    },
    {
      id: 6,
      url: "https://laodong.vn/",
      content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
      vector: "success",
    },
  ],
};

export default { columns, siteMaps };
