export type PostType = {
  id: number;
  createdAt: number;
  editedAt?: number;
  userId: number;
  author: string;
  content: string;
  new?: boolean;
  bookmarkId?: number;
};

export type PostUpdatePayload = {
  id: number;
  content?: string;
  bookmarkId?: number;
};

export interface PostWithBookmarksType extends PostType {
  bookmarks: BookmarkType[];
}

export type BookmarkType = {
  id: number;
  userId: number;
  postId: number;
  name: string;
};

export type UserType = {
  id: number;
  createdAt: number;
  email: string;
  accessToken: string;
};

export type UserWithToken = {
  accessToken: string;
  user: UserType;
};
