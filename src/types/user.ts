export type UserType = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type UserObj = {
  profile: UserType;
};
