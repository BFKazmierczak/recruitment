import { BookmarkType, PostType, UserWithToken } from '../shared/types';
import { store } from '../state/store';

const API_URL = import.meta.env.API_URL || 'http://localhost:3000';

type GenericResponse<T> = { status: 0; payload: T } | { status: 1; error: string };

export function getApiUrl(endpoint: string) {
  return API_URL.concat(endpoint);
}

export function getUser() {
  const { user } = store.getState().auth;

  return { token: `Bearer ${user.accessToken}`, user };
}

export async function registerUser(email: string, password: string): Promise<GenericResponse<null>> {
  try {
    const response = await fetch(getApiUrl('/register'), {
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
        error: await response.json(),
      };

    return {
      status: 0,
      payload: null,
    };
  } catch (error) {
    return {
      status: 1,
      error,
    };
  }
}

export async function loginUser(email: string, password: string): Promise<GenericResponse<UserWithToken>> {
  try {
    const response = await fetch(getApiUrl('/login'), {
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
        error: await response.json(),
      };

    const user = (await response.json()) as UserWithToken;

    return {
      status: 0,
      payload: {
        accessToken: user.accessToken,
        user: user.user,
      },
    };
  } catch (error) {
    return {
      status: 1,
      error,
    };
  }
}

export async function createPost(content: string): Promise<GenericResponse<PostType>> {
  const { token: Authorization, user } = getUser();

  try {
    const response = await fetch(getApiUrl('/api/posts'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
      body: JSON.stringify({
        userId: user.id,
        author: user.email,
        content,
        createdAt: Date.now(),
      }),
    });

    if (!response.ok)
      return {
        status: 1,
        error: await response.json(),
      };

    const post = await response.json();

    return {
      status: 0,
      payload: post,
    };
  } catch (error) {
    return {
      status: 1,
      error,
    };
  }
}

export async function updatePost(id: number, content: string): Promise<GenericResponse<PostType>> {
  const { token: Authorization } = getUser();

  try {
    const response = await fetch(getApiUrl(`/api/posts/${id}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
      body: JSON.stringify({
        content,
      }),
    });

    if (!response.ok) return { status: 1, error: await response.json() };

    const post = await response.json();

    return {
      status: 0,
      payload: post,
    };
  } catch (error) {
    return {
      status: 1,
      error,
    };
  }
}

export async function deletePost(id: number): Promise<GenericResponse<null>> {
  const { token: Authorization } = getUser();

  try {
    const response = await fetch(getApiUrl(`/api/posts/${id}`), {
      method: 'DELETE',
      headers: {
        Authorization,
      },
    });

    if (!response.ok) return { status: 1, error: await response.json() };

    return {
      status: 0,
      payload: null,
    };
  } catch (error) {
    return { status: 1, error };
  }
}

export async function saveBookmark(postId: number, name: string): Promise<GenericResponse<BookmarkType>> {
  const { token: Authorization, user } = getUser();

  console.log({ postId, name });

  try {
    const response = await fetch(getApiUrl('/api/bookmarks'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
      body: JSON.stringify({
        userId: user.id,
        postId,
        name,
      }),
    });

    if (!response.ok) return { status: 1, error: await response.json() };

    const bookmark = await response.json();

    return {
      status: 0,
      payload: bookmark,
    };
  } catch (error) {
    return { status: 1, error };
  }
}

export async function deleteBookmark(id: number): Promise<GenericResponse<null>> {
  const { token: Authorization } = getUser();

  try {
    const response = await fetch(getApiUrl(`/api/bookmarks/${id}`), {
      method: 'DELETE',
      headers: {
        Authorization,
      },
    });

    if (!response.ok) return { status: 1, error: await response.json() };

    return {
      status: 0,
      payload: null,
    };
  } catch (error) {
    return { status: 1, error };
  }
}
