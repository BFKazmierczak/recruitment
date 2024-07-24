import { PostType } from '../shared/types';

type GenericResponse<T> = { status: 0; payload: T } | { status: 1; error: string };

export async function createPost(content: string): Promise<GenericResponse<PostType>> {
  const response = await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      author: 'bfkazmierczak@gmail.com',
      content,
      createdAt: Date.now(),
    }),
  });

  if (!response.ok)
    return {
      status: 1,
      error: response.statusText,
    };

  const post = await response.json();

  return {
    status: 0,
    payload: post,
  };
}

export async function updatePost(id: number, content: string) {
  fetch('http://localhost:3000/api/posts', {
    method: 'PUT',
    body: JSON.stringify({
      content,
    }),
  });
}

export async function deletePost(id: number) {
  await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: 'DELETE',
  });

  return true;
}
