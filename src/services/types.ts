export interface IResponse<Data> {
  status: number;
  message: string;
  data: Data;
}

export interface IError {
  status: number;
  message: string;
}

export type IKeyValueObject = {
  key: string;
  value: string;
};
export type IMetadata = Record<string, string>;
