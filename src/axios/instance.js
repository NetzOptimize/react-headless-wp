import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const headers = {
  Accept: "application/json",
  Authorization: process.env.REACT_APP_BEARER_TOKEN,
};

const instance = axios.create({
  baseURL: baseURL,
  headers: headers,
});

export default instance;
