export type PostType = {
  id: number;
  createdAt: number;
  editedAt?: number;
  author: string;
  content: string;
  new?: boolean;
};
