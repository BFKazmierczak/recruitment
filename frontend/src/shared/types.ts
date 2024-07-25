export type PostType = {
  id: number;
  createdAt: number;
  editedAt?: number;
  author: string;
  content: string;
  new?: boolean;
};

export type UserType = {
  id: number;
  email: string;
  accessToken: string;
};

export type UserWithToken = {
  accessToken: string;
  user: UserType;
};
