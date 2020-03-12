import React, { useState, useEffect } from "react";

const postIds = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * @description
 * @param {*} id
 * @returns {Promise<any>}
 */
async function fetchPost(id: number): Promise<unknown> {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => res.json());
}

export default (): JSX.Element => {
  const [postId, setpostId] = useState<number>(postIds[0]);
  const [post, setPost] = useState<unknown>();
  const [fetchErr, setFetchErr] = useState<unknown>();
  const activePostIndex = postIds.indexOf(postId);

  useEffect(() => {
    fetchPost(postId).then((value) => {
      setPost(value);
      setFetchErr(undefined);
    }).catch((err) => {
      setFetchErr(err);
      setPost(undefined);
    });
  }, [fetchErr, postId]);
  if (!post && !fetchErr) return <p>Loading...</p>;
  if (fetchErr) return <pre>{JSON.stringify(fetchErr, null, 2)}</pre>;
  return (
    <div>
      <pre>{JSON.stringify(post, null, 2)}</pre>
      {!!postIds[activePostIndex + 1] && <button type="button" onClick={(): void => setpostId(postIds[activePostIndex + 1])}>Next Post</button>}
      {!!postIds[activePostIndex - 1] && <button type="button" onClick={(): void => setpostId(postIds[activePostIndex - 1])}>Previous Post</button>}
    </div>
  );
};
/*
  Instructions:
    You're given an array of `postIds` and a `fetchPost` function.
    When you invoke `fetchPost`, you'll need to pass it an `id` from
    the `postIds` array. `fetchPost` returns a promise that will resolve
    with a post shaped like this

    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "string"
    }

    The UI should show `Loading` if the request is still being made,
    an error message if there was an error, or the post title, body,
    and a button to fetch the next post on a successful request.
*/
