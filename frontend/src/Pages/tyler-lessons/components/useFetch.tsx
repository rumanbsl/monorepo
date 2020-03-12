import React, { useReducer, useEffect } from "react";

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

interface Post {
  activeIndex: number;
  post?: unknown;
}

/**
 * @description
 * @param {Post} initialState
 * @param {({ type: "next" | "prev" | "err" })} action
 * @returns Post
 */
function postReducer(initialState: Post, action: { type: "next" | "prev" | "success" | "err"; data?: unknown }): Post {
  const state = { ...initialState };
  switch (action.type) {
  case "prev": {
    state.activeIndex = postIds[state.activeIndex - 1] !== undefined ? state.activeIndex - 1 : state.activeIndex;
    return state;
  }
  case "next": {
    state.activeIndex = postIds[state.activeIndex + 1] !== undefined ? state.activeIndex + 1 : state.activeIndex;
    return state;
  }
  case "success":
  case "err": {
    state.post = action.data;
    return state;
  }

  default: throw Error();
  }
}
/**
 * @description
 * @returns {([Post["post"], (type: "next" | "prev" | "err") => void])}
 */
function usePost(): [{ post: Post["post"]; next: boolean; prev: boolean }, (type: "next" | "prev" | "err") => void] {
  const [state, dispatch] = useReducer(postReducer, { activeIndex: 0 });

  useEffect(() => {
    fetchPost(postIds[state.activeIndex])
      .then((data) => dispatch({ type: "success", data }))
      .catch((data) => dispatch({ type: "err", data }));
  }, [state.activeIndex]);

  return [
    {
      post : state.post,
      next : postIds[state.activeIndex + 1] !== undefined,
      prev : postIds[state.activeIndex - 1] !== undefined,
    },
    (type: "next" | "prev" | "err"): void => dispatch({ type }),
  ];
}

export default (): JSX.Element => {
  const [state, setPost] = usePost();
  return (
    <div>
      <pre>
        {state.post && JSON.stringify(state.post, null, 2)}
      </pre>
      {state.next && <button type="button" onClick={(): void => { setPost("next"); }}>Increment</button>}
      {state.prev && <button type="button" onClick={(): void => { setPost("prev"); }}>Decrement</button>}
    </div>
  );
};
