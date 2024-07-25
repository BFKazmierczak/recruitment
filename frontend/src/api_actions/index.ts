import { PostType, UserType } from '../shared/types';

type GenericResponse<T> = { status: 0; payload: T } | { status: 1; error: string };

export async function registerUser(email: string, password: string): Promise<GenericResponse<null>> {
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok)
      return {
        status: 1,
        error: response.statusText,
      };

    return {
      status: 0,
      payload: null,
    };
  } catch {
    throw new Error('Unexpected error when registering');
  }
}

export async function loginUser(email: string, password: string): Promise<GenericResponse<UserWithToken>> {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok)
      return {
        status: 1,
        error: response.statusText,
      };

    const user = (await response.json()) as UserWithToken;

    return {
      status: 0,
      payload: {
        accessToken: user.accessToken,
        user: user.user,
      },
    };
  } catch {
    throw new Error('Unexpected error when registering');
  }
}

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

export async function updatePost(id: number, content: string): Promise<GenericResponse<PostType>> {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        content,
      }),
    });

    if (!response.ok) return { status: 1, error: response.statusText };

    const post = await response.json();

    return {
      status: 0,
      payload: post,
    };
  } catch {
    throw new Error('Unexpected error encountered while updating a post');
  }
}

export async function deletePost(id: number) {
  await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: 'DELETE',
  });

  return true;
}
