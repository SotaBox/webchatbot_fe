import axios from "axios";

const instance = axios.create({
  baseURL: "https://reqres.in",
});
type IResponse = {
  data: string;
  statusCode: number;
  headers: string;
}
instance.interceptors.response.use(
  function (response) {
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    const res: IResponse={} ;
    if (error.response) {
      res.data = error.response.data;
      res.statusCode = error.response.status;
      res.headers = error.response.headers;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    return res;
  }
);

export default instance;
