import { SERVER_BASE_URL } from "@/utils/constant";
import fetcher from "@/utils/fetcher";
import { FetchRV } from "@/types";
import { AuthorizedUserObj, UpdateUser, UserObj } from "@/types/user";

export const getUserUrl = (username: string) =>
  `${SERVER_BASE_URL}/profiles/${username}`;

export const registerUser = (
  username: string,
  email: string,
  password: string
) =>
  fetcher.post<FetchRV<AuthorizedUserObj>>(`${SERVER_BASE_URL}/users`, {
    user: { username, email, password },
  });

export const loginUser = (email: string, password: string) =>
  fetcher.post<FetchRV<AuthorizedUserObj>>(`${SERVER_BASE_URL}/users/login`, {
    user: { email, password },
  });

export const getCurrentUser = (token: string) =>
  fetcher.get<FetchRV<AuthorizedUserObj>>(`${SERVER_BASE_URL}/user`, token);

export const updateCurrentUser = (user: Partial<UpdateUser>, token: string) =>
  fetcher.put<FetchRV<AuthorizedUserObj>>(
    `${SERVER_BASE_URL}/user`,
    { user },
    token
  );

export const followUser = (
  follow: boolean,
  username: string,
  token: string
) => {
  const url = `${SERVER_BASE_URL}/profiles/${username}/follow`;
  if (follow) return fetcher.post<FetchRV<UserObj>>(url, null, token);
  return fetcher.delete<FetchRV<UserObj>>(url, token);
};
