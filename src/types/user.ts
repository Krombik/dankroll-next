export type UserType = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type UserObj = {
  profile: UserType;
};

export type AuthorizedUser = {
  user: {
    bio: string;
    createdAt: string;
    email: string;
    id: number;
    image: null | string;
    token: string;
    updatedAt: string;
    username: string;
  };
};