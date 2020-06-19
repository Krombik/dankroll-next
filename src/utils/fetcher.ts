import axios from "axios";

const updateOptions = () => {
  const token = localStorage.user
    ? JSON.parse(localStorage.user)?.token
    : undefined;
  if (token)
    return {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
  return {};
};

export const serverFetcher = async <T = any>(url: string) =>
  (await axios.get<T>(url)).data;

export const fetcher = async <T = any>(url: string) => {
  const { data } = await axios.get<T>(url, updateOptions());
  return data;
};
