import axios from "axios";
import { SERVER_BASE_URL } from "../utils/constant";
import fetcher from "../utils/fetcher";
import { FetchRV } from "../types";
import { UserObj, AuthorizedUser } from "../types/user";

export const getUserUrl = (username: string) =>
  `${SERVER_BASE_URL}/profiles/${username}`;

export const registerUser = async (
  username: string,
  email: string,
  password: string
) =>
  await fetcher.post<FetchRV<AuthorizedUser>>(`${SERVER_BASE_URL}/users`, {
    user: { username, email, password },
  });

export const loginUser = async (email: string, password: string) =>
  await fetcher.post<FetchRV<AuthorizedUser>>(
    `${SERVER_BASE_URL}/users/login`,
    {
      user: { email, password },
    }
  );

export const getCurrentUserName = async (token: string) =>
  await fetcher.get<FetchRV<AuthorizedUser>>(`${SERVER_BASE_URL}/user`, token);

const UserAPI = {
  current: async () => {
    const user: any = window.localStorage.getItem("user");
    const token = user?.token;
    try {
      const response = await axios.get(`/user`, {
        headers: {
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  login: async (email, password) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/users/login`,
        JSON.stringify({ user: { email, password } }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  register: async (username, email, password) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/users`,
        JSON.stringify({ user: { username, email, password } }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  save: async (user) => {
    try {
      const response = await axios.put(
        `${SERVER_BASE_URL}/user`,
        JSON.stringify({ user }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  follow: async (username) => {
    const user: any = JSON.parse(window.localStorage.getItem("user"));
    const token = user?.token;
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/profiles/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Token ${encodeURIComponent(token)}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  unfollow: async (username) => {
    const user: any = JSON.parse(window.localStorage.getItem("user"));
    const token = user?.token;
    try {
      const response = await axios.delete(
        `${SERVER_BASE_URL}/profiles/${username}/follow`,
        {
          headers: {
            Authorization: `Token ${encodeURIComponent(token)}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  get: async (username) => axios.get(`${SERVER_BASE_URL}/profiles/${username}`),
};

export default UserAPI;
