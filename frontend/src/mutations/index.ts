export function updatePost(id: number, content: string) {
  fetch('http://localhost:3000/api/posts', {
    method: 'PUT',
    body: JSON.stringify({
      content,
    }),
  });
}

export function deletePost(id: number) {
  fetch(`http://localhost:3000/api/posts/${id}`, {
    method: 'DELETE',
  });
}
