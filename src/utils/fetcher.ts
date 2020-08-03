import axios, { AxiosResponse } from "axios";
import { FetchRV } from "@/types";

const fetcher = {
  async get<T = {}>(url: string, token?: string): Promise<FetchRV<T>> {
    try {
      return (
        await axios.get(
          url,
          token
            ? {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            : {}
        )
      ).data;
    } catch (error) {
      const { data, status } = error.response as AxiosResponse;
      return { ...data, status };
    }
  },
  async delete<T = {}>(url: string, token?: string): Promise<FetchRV<T>> {
    try {
      return (
        await axios.delete(
          url,
          token
            ? {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            : {}
        )
      ).data;
    } catch (error) {
      const { data, status } = error.response as AxiosResponse;
      return { ...data, status };
    }
  },
  async post<T = {}>(
    url: string,
    content: any,
    token?: string
  ): Promise<FetchRV<T>> {
    try {
      const config =
        !!content || !!token
          ? {
              headers: {
                ...(content ? { "Content-Type": "application/json" } : {}),
                ...(token ? { Authorization: `Token ${token}` } : {}),
              },
            }
          : {};
      return (
        await axios.post(url, content ? JSON.stringify(content) : {}, config)
      ).data;
    } catch (error) {
      const { data, status } = error.response as AxiosResponse;
      return { ...data, status };
    }
  },
  async put<T = {}>(
    url: string,
    content: any,
    token?: string
  ): Promise<FetchRV<T>> {
    try {
      const config =
        !!content || !!token
          ? {
              headers: {
                ...(content ? { "Content-Type": "application/json" } : {}),
                ...(token ? { Authorization: `Token ${token}` } : {}),
              },
            }
          : {};
      return (
        await axios.put(url, content ? JSON.stringify(content) : {}, config)
      ).data;
    } catch (error) {
      const { data, status } = error.response as AxiosResponse;
      return { ...data, status };
    }
  },
};

export default fetcher;
