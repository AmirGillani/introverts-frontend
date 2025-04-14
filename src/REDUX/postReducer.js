import { createSlice } from "@reduxjs/toolkit";

export const postsReducer = createSlice({
  name: "posts",

  initialState: {
    status: "",
    error: "",
    posts: [],
    comments:[],
    personPosts:[],
    person:{},
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
    userPostRequest: (state) => {
      state.status = "loading";
    },
    userPostSuccess: (state, action) => {
      state.status = "succeed";
      state.personPosts = action.payload.userPosts;
      state.person = action.payload.person;
    },
    userPostFailure: (state, action) => {
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

    editCommentRequest: (state) => {
      state.status = "loading";
    },
    editCommentSuccess: (state, action) => {
      state.status = "succeed";
      state.message = action.payload.message;
      
    },
    editCommentFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
    },

    deleteCommentRequest: (state) => {
      state.status = "loading";
    },
    deleteCommentSuccess: (state, action) => {
      state.status = "succeed";
      state.message = action.payload.message;
      
    },
    deleteCommentFailure: (state, action) => {
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
  userPostRequest,
  userPostSuccess,
  userPostFailure,
  likePostSuccess,
  likePostFailure,

  commentRequest,
  commentSuccess,
  commentFailure,
  
  editCommentRequest,
  editCommentSuccess,
  editCommentFailure,

  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure,

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
    const response = await fetch(`https://introverts-backend.vercel.app/posts/createPost`, {
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
    const response = await fetch(`https://introverts-backend.vercel.app/posts/timeline`, {
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

export const userPosts = (id) => async (dispatch) => {
  dispatch(userPostRequest());

  try {
    const response = await fetch(`https://introverts-backend.vercel.app/posts/userPosts/${id}`);

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(userPostFailure({ message: responseData.message }));
    } else {
      dispatch(userPostSuccess({ userPosts: responseData.userPosts , person:responseData.person }));
    }
  } catch (error) {
    dispatch(userPostFailure(error.message));
  }
};

export const likePost = (id, token) => async (dispatch) => {
  try {
    const response = await fetch(`https://introverts-backend.vercel.app/posts/likePost/${id}`, {
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

export const sendComment = (data, id, token,userID) => async (dispatch) => {
  dispatch(commentRequest());

  try {
    const response = await fetch(
      `https://introverts-backend.vercel.app/posts/sendComment/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({comment:data,userID:userID}),
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

export const editComment = (data, postID,commentID,token, userID) => async (dispatch) => {
  dispatch(editCommentRequest());

  try {
    const response = await fetch(
      `https://introverts-backend.vercel.app/posts/editComment/${postID}`,
      {
        method: "PUT",
        body: JSON.stringify({comment:data,commentID:commentID,userID:userID}),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(editCommentFailure({ message: responseData.message }));
    } else {
      dispatch(
        editCommentSuccess({
          message: responseData.message
        })
      );
    }
  } catch (error) {
    dispatch(editCommentFailure(error.message));
  }
};

export const deleteComment = (postID,commentID,token) => async (dispatch) => {
  dispatch(deleteCommentRequest());

  try {
    const response = await fetch(
      `https://introverts-backend.vercel.app/posts/deleteComment/${postID}/${commentID}`,
      {
        method: "DELETE",
     
        headers: {
        
          authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(deleteCommentFailure({ message: responseData.message }));
    } else {
      dispatch(
        deleteCommentSuccess({
          message: responseData.message
        })
      );
    }
  } catch (error) {
    dispatch(deleteCommentFailure(error.message));
  }
};

export const sendReply = (commentID, postID, token,text) => async (dispatch) => {

  dispatch(replyRequest());

  try {
    const response = await fetch(
      `https://introverts-backend.vercel.app/posts/sendReply/${postID}`,
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
      `https://introverts-backend.vercel.app/posts/allComments/${id}`,
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
