import { createSlice } from "@reduxjs/toolkit";

// FETCH DATA FROM LOCAL STORAGE

function getDataFromLocalStorage(data) {
  const storedData = JSON.parse(localStorage.getItem(data));

  if (data === "user") return storedData.user;

  if (data === "token") return storedData.token;
}

export const authReducer = createSlice({
  name: "user",

  initialState: {
    user: localStorage.getItem("user") ? getDataFromLocalStorage("user") : null,
    users: [],
    token: localStorage.getItem("token")
      ? getDataFromLocalStorage("token")
      : null,

    status: "",
    updated:false,
    error: "",
    authenticated: localStorage.getItem("user") ? true : false,
    validationErrors: [],
    followers:[]
  },

  reducers: {
    loginRequest: (state) => {
      state.status = "loading";
    },
    loginSuccess: (state, action) => {
      state.status = "succeed";
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authenticated = true;

      //SAVE USER AND TOKEN IN LOCAL STORAGE

      localStorage.setItem(
        "user",
        JSON.stringify({
          user: action.payload.user,
        })
      );

      localStorage.setItem(
        "token",
        JSON.stringify({
          token: action.payload.token,
        })
      );
    },
    loginFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
      state.validationErrors = action.payload.errors;
      state.authenticated = false;
    },
    signupRequest: (state) => {
      state.status = "loading";
    },
    signupSuccess: (state, action) => {
      state.status = "succeed";
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authenticated = true;

      //SAVE USER AND TOKEN IN LOCAL STORAGE

      localStorage.setItem(
        "user",
        JSON.stringify({
          user: action.payload.user,
        })
      );

      localStorage.setItem(
        "token",
        JSON.stringify({
          token: action.payload.token,
        })
      );
    },
    signupFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
      state.validationErrors = action.payload.errors;
      state.authenticated = false;
    },
    editProfileRequest: (state) => {
      state.status = "loading";
    },
    editProfileSuccess: (state, action) => {
      state.status = "succeed";
      state.user = action.payload.user;

      //SAVE USER AND TOKEN IN LOCAL STORAGE

      localStorage.setItem(
        "user",
        JSON.stringify({
          user: action.payload.user,
        })
      );
    },
    editProfileFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
    },
    allUsersRequest: (state) => {
      state.status = "loading";
    },
    allUsersSuccess: (state, action) => {
      state.status = "succeed";
      state.users = action.payload.users;
    },
    allUsersFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
    },

    UserRequest: (state) => {
      state.status = "loading";
    },
    UserSuccess: (state, action) => {
      state.status = "succeed";
      state.user = action.payload.user;
    },
    UserFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
    },
    followUserSuccess: (state, action) => {
      state.status = "succeed";
      state.message = action.payload.message;
      state.user = action.payload.user;

    },
    followUserFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
    },
    unFollowUserSuccess: (state, action) => {
      state.status = "succeed";
      state.message = action.payload.message;
      state.user = action.payload.user;

    },
    unFollowUserFailure: (state, action) => {
      state.status = "failure";
      state.error = action.payload.message;
      
    },
    FetchFollowersSuccess: (state, action) => {
      state.status = "succeed";
      state.followers = action.payload.followers;
      
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  editProfileRequest,
  editProfileSuccess,
  editProfileFailure,
  allUsersRequest,
  allUsersSuccess,
  allUsersFailure,
  UserRequest,
  UserSuccess,
  UserFailure,
  followUserSuccess,
  followUserFailure,
  unFollowUserSuccess,
  unFollowUserFailure,
  FetchFollowersSuccess
} = authReducer.actions;

export default authReducer.reducer;

export const signup = (data) => async (dispatch) => {
  dispatch(signupRequest());

  try {
    const response = await fetch(`https://introverts-backend.vercel.app/auth/signup`, {
      method: "POST",
      body: data
    });

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(signupFailure({ errors: responseData.errors }));
    } else {
      dispatch(
        signupSuccess({ user: responseData.user, token: responseData.token })
      );
    }
  } catch (error) {
    dispatch(signupFailure(error.message));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await fetch(`https://introverts-backend.vercel.app/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(loginFailure({ errors: responseData.errors }));
      if (response.status === 401)
        dispatch(
          loginFailure({
            errors: responseData.errors,
          })
        );
    } else {
      dispatch(
        loginSuccess({ user: responseData.user, token: responseData.token })
      );
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const editProfile = (data, token, id) => async (dispatch) => {
  dispatch(editProfileRequest());

  try {
    const response = await fetch(
      `https://introverts-backend.vercel.app/users/updateUser/${id}`,
      {
        method: "PUT",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(editProfileFailure({ message: responseData.message }));
    } else {
      dispatch(editProfileSuccess({ user: responseData.user }));
    }
  } catch (error) {
    dispatch(editProfileFailure(error.message));
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(allUsersRequest());

  try {
    const response = await fetch(`https://introverts-backend.vercel.app/users/`);

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(allUsersFailure({ message: responseData.message }));
    } else {
      dispatch(allUsersSuccess({ users: responseData.users }));
    }
  } catch (error) {
    dispatch(allUsersFailure(error.message));
  }
};

export const getSingleUser = (id) => async (dispatch) => {
  dispatch(UserRequest());

  try {
    const response = await fetch(`https://introverts-backend.vercel.app/users/${id}`);

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(UserFailure({ message: responseData.message }));
    } else {
      dispatch(UserSuccess({ user: responseData.user }));
    }
  } catch (error) {
    dispatch(UserFailure(error.message));
  }
};

export const fetchFollowers = (id,text) => async (dispatch) => {
  dispatch(UserRequest());

  try {
    const response = await fetch(`https://introverts-backend.vercel.app/users/fetchFollowers/`,{
      method:"PUT",
      body:JSON.stringify({id,text}),
      headers:{
        "Content-Type":"application/json"
      }
    });

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(UserFailure({ message: responseData.message }));
    } else {
      dispatch(FetchFollowersSuccess({ followers: responseData.followers }));
    }
  } catch (error) {
    dispatch(UserFailure(error.message));
  }
};

export const followUser = (id, token) => async (dispatch) => {
  try {
    const response = await fetch(`https://introverts-backend.vercel.app/users/follow/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(followUserFailure({ message: responseData.message }));
    } else {
      dispatch(followUserSuccess({ message: responseData.message, user:responseData.user }));
    }
  } catch (error) {
    dispatch(followUserFailure(error.message));
  }
};

export const unFollowUser = (id, token) => async (dispatch) => {

  try {
    const response = await fetch(`https://introverts-backend.vercel.app/users/unfollow/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      dispatch(unFollowUserFailure({ message: responseData.message }));
    } else {
      dispatch(unFollowUserSuccess({ message: responseData.message,user:responseData.user }));
    }
  } catch (error) {
    dispatch(unFollowUserFailure(error.message));
  }
};
