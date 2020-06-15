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

export const serverFetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export const fetcher = async (url: string) => {
  const { data } = await axios.get(url, updateOptions());
  return data;
};
