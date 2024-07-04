export enum Vector {
  SUCCESS = "success",
  IN_PROGRESS = "inprogress",
  FAILED = "failed",
  NULL = "null",
}
export default interface IGetUrl {
  id: string;
  description: string;
  url: string;
  vector_status: string;
}
