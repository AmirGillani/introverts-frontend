import { createSlice } from "@reduxjs/toolkit";

export const postsReducer = createSlice({
  name: "posts",

  initialState: {
    status: "",
    error: "",
    posts: [],
    comments:[],
    post: null,
    added: false,
  },

  reducers: {
    postRequest: (state) => {
      state.status = "loading";
    },
    postSuccess: (state, action) => {
      state.status = "succeed";
      state.message = action.payload.message;
      state.added = true;
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

    commentRequest: (state) => {
      state.status = "loading";
    },
    commentSuccess: (state, action) => {
      state.status = "succeed";
      state.message = action.payload.message;
      state.post = action.payload.post;
      state.added=true;
    },
    commentFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
    },

    replyRequest: (state) => {
      state.status = "loading";
    },
    replySuccess: (state, action) => {
      state.status = "succeed";
      state.message = action.payload.message;

    },
    replyFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
    },

    allCommentsRequest: (state) => {
      state.status = "loading";
    },
    allCommentsSuccess: (state, action) => {
      state.status = "succeed";
      state.comments = action.payload.comments;
    },
    allCommentsFailure: (state, action) => {
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
  commentRequest,
  commentSuccess,
  commentFailure,
  replyRequest,
  replySuccess,
  replyFailure,
  allCommentsRequest,
  allCommentsSuccess,
  allCommentsFailure,
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

export const likePost = (id, token) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5000/posts/likePost/${id}`, {
      method: "PUT",
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

export const sendComment = (data, id, token) => async (dispatch) => {
  dispatch(commentRequest());

  try {
    const response = await fetch(
      `http://localhost:5000/posts/sendComment/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(commentFailure({ message: responseData.message }));
    } else {
      dispatch(
        commentSuccess({
          message: responseData.message,
          post: responseData.post,
        })
      );
    }
  } catch (error) {
    dispatch(commentFailure(error.message));
  }
};

export const sendReply = (commentID, postID, token,text) => async (dispatch) => {

  dispatch(replyRequest());

  try {
    const response = await fetch(
      `http://localhost:5000/posts/sendReply/${postID}`,
      {
        method: "PUT",
        body: JSON.stringify({text:text,commentID:commentID}),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(replyFailure({ message: responseData.message }));
    } else {
      dispatch(
        replySuccess({
          message: responseData.message,
          post: responseData.post,
        })
      );
    }
  } catch (error) {
    dispatch(replyFailure(error.message));
  }
};

export const allComments = (id, token) => async (dispatch) => {
  dispatch(allCommentsRequest());

  try {
    const response = await fetch(
      `http://localhost:5000/posts/allComments/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(allCommentsFailure({ message: responseData.message }));
    } else {
      dispatch(
        allCommentsSuccess({
          comments: responseData.comments,
        })
      );
    }
  } catch (error) {
    dispatch(allCommentsFailure(error.message));
  }
};
