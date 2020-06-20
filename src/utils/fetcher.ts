import axios, { AxiosError } from "axios";
import { FetchError, FetchRV } from "../types";

const updateOptions = () => {
  if (typeof localStorage !== "undefined") {
    const token = localStorage.user
      ? JSON.parse(localStorage.user)?.token
      : undefined;
    if (token)
      return {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
  }
  return {};
};

export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    return (await axios.get<T>(url, updateOptions())).data;
  } catch (error) {
    return error.response.data;
  }
};
