import axios from "axios";

export const fetchClient = axios.create({
  baseURL: "https://swapi.dev/api",
  validateStatus: function (status) {
    return status !== 404;
  },
});
