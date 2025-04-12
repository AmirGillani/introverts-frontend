import { createSlice } from "@reduxjs/toolkit";

export const postsReducer = createSlice({
  name: "posts",

  initialState: {
    status: "",
    error: "",
    posts:[],
    added:false
  },

  reducers: {
    postRequest: (state) => {
      state.status = "loading";
    },
    postSuccess: (state, action) => {
      state.status = "succeed";
      state.message = action.payload.message;
      state.added =true
    },
    postFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
    },
    timelinePostRequest: (state) => {
      state.status = "loading";
    },
    timelinePostSuccess: (state, action) => {
      state.status = "succeed";
      state.posts = action.payload.posts;
    },
    timelinePostFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
    },
    likePostSuccess: (state, action) => {
      state.status = "succeed";
      state.message = action.payload.message;
    },
    likePostFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
    },
  },
});

export const {
  postRequest,
  postSuccess,
  postFailure,
  timelinePostRequest,
  timelinePostSuccess,
  timelinePostFailure,
  likePostSuccess,
  likePostFailure,
} = postsReducer.actions;

export default postsReducer.reducer;

export const createPost = (data, token) => async (dispatch) => {
  dispatch(postRequest());

  try {
    const response = await fetch(`http://localhost:5000/posts/createPost`, {
      method: "POST",
      body: data,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(postFailure({ message: responseData.message }));
    } else {
      dispatch(postSuccess({ message: responseData.message }));
    }
  } catch (error) {
    dispatch(postFailure(error.message));
  }
};

export const timelinePosts = (token) => async (dispatch) => {
  dispatch(timelinePostRequest());

  try {
    const response = await fetch(`http://localhost:5000/posts/timeline`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(timelinePostFailure({ message: responseData.message }));
    } else {
      dispatch(timelinePostSuccess({ posts: responseData }));
    }
  } catch (error) {
    dispatch(timelinePostFailure(error.message));
  }
};

export const likePost = (id,token) => async (dispatch) => {

  try {
    const response = await fetch(`http://localhost:5000/posts/likePost/${id}`, {
      method:"PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(likePostFailure({ message: responseData.message }));
    } else {
      dispatch(likePostSuccess({ posts: responseData.message }));
    }
  } catch (error) {
    dispatch(likePostFailure(error.message));
  }
};
