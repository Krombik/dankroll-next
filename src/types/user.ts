export type UserType = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type UserObj = {
  profile: UserType;
};

export type AuthorizedUserObj = {
  user: AuthorizedUserType;
};

export type AuthorizedUserType = {
  bio: string;
  createdAt: string;
  email: string;
  id: number;
  image: null | string;
  token: string;
  updatedAt: string;
  username: string;
};

export type UpdateUser = {
  email: string;
  username: string;
  password: string;
  image: string;
  bio: string;
};
