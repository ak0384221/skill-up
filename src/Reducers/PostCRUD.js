const postsInitialState = {
  posts: [],
  isLoading: false,
  lastDoc: null,
  hasMore: true,
  isError: null,
};

function postsContentReducerMethod(currValue, action) {
  let newValue = currValue;

  if (action.type === "ADD_INITIAL_POSTS") {
    newValue = {
      ...currValue,
      posts: action.payload.posts,
      lastDoc: action.payload.lastDoc,
      hasMore: action.payload.hasMore,
    };
  }
  if (action.type === "SET_LOADING") {
    newValue = {
      ...currValue,
      isLoading: action.payload.isLoading,
    };
  }
  if (action.type === "SET_CRUD_ERROR") {
    newValue = {
      ...currValue,
      crudError: action.payload.crudError,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    newValue = {
      ...currValue,
      posts: newValue.posts.filter((post) => post.id !== action.payload.postId),
    };
  }
  if (action.type === "UPDATE_ITEM") {
    newValue = {
      ...currValue,
      posts: currValue.posts.map((post) =>
        post.id === action.payload.postId
          ? { ...post, ...action.payload.updatedData }
          : post
      ),
      crudError: action.payload.crudError,
    };
  }
  if (action.type === "FETCH_MORE_ITEM") {
    newValue = {
      ...currValue,
      posts: [...currValue.posts, ...action.payload.posts],
      lastDoc: action.payload.lastDoc,
      hasMore: action.payload.hasMore,
      isLoading: false,
    };
  }
  if (action.type === "SET_HAS_MORE") {
    newValue = {
      ...currValue,
      hasMore: action.payload.hasMore,
    };
  }

  return newValue;
}

export { postsInitialState, postsContentReducerMethod };
