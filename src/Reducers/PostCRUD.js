const postsInitialState = {
  postLists: [],
  postLoading: false,
  lastDoc: null,
  hasMore: true,
  crudError: null,
};

function postsContentReducerMethod(currValue, action) {
  let newValue = currValue;

  if (action.type === "ADD_INITIAL_POSTS") {
    console.log(action);
    newValue = {
      ...currValue,
      postLists: action.payload.postLists,
      lastDoc: action.payload.lastDoc,
      hasMore: action.payload.hasMore,
    };
  }
  if (action.type === "SET_LOADING") {
    newValue = {
      ...currValue,
      postLoading: action.payload.postLoading,
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
      postLists: newValue.postLists.filter(
        (post) => post.id !== action.payload.postId
      ),
    };
  }
  if (action.type === "UPDATE_ITEM") {
    newValue = {
      ...currValue,
      postLists: currValue.postLists.map((post) =>
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
      postLists: [...currValue.postLists, ...action.payload.newPosts],
      lastDoc: action.payload.lastDoc,
      hasMore: action.payload.hasMore,
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
