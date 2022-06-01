import axios from "axios";
import urlSerialize from "../../utils/urlSerialize";

const SET_USERS = "SET_USERS";
const SET_DELETE_USER = "SET_DELETE_USER";
const SORT_USERS = "SORT_USERS";

const INITIAL_STATE = {
  users: []
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case SET_DELETE_USER:
      const users = state.users.filter((user) => {
        return user.id !== action.payload.id;
      });
      return {
        users
      };
    case SORT_USERS:
      let sortedUsers = state;

      switch (action.payload) {
        case "firstName":
          sortedUsers = state.users.sort((a, b) => a.firstName.localeCompare(b.firstName));
          break;
        case "lastName":
          sortedUsers = state.users.sort((a, b) => a.lastName.localeCompare(b.lastName));
          break;
        case "maidenName":
          sortedUsers = state.users.sort((a, b) => a.maidenName.localeCompare(b.maidenName));
          break;
        case "birthDateMin":
          sortedUsers = state.users.sort((a, b) => new Date(b.birthDate) - new Date(a.birthDate));
          break;
        case "birthDateMax":
          sortedUsers = state.users.sort((a, b) => new Date(a.birthDate) - new Date(b.birthDate));
          break;
        default:
          sortedUsers = state;
          break;
      }

      console.log(sortedUsers);

      return {
        users: [...sortedUsers]
      };
    default: {
      return state;
    }
  }
};

export default usersReducer;

export const fetchUsers = (params) => {
  const paramsString = `?${urlSerialize(params)}` || "";

  return (dispatch) => {
    axios.get(`https://dummyjson.com/users${paramsString}`).then((resp) => {
      dispatch(setUsers(resp.data.users));
    });
  };
};

export const searchUsers = (text) => {
  return (dispatch) => {
    axios.get(`https://dummyjson.com/users/search?q=${text}`).then((resp) => {
      dispatch(setUsers(resp.data.users));
    });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    axios.delete(`https://dummyjson.com/users/${id}`).then((resp) => {
      dispatch(setDeleteUser(resp.data));
    });
  };
};

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users
  };
};

export const setDeleteUser = (user) => {
  return {
    type: SET_DELETE_USER,
    payload: user
  };
};

export const sortUsers = (sortBy) => {
  return {
    type: SORT_USERS,
    payload: sortBy
  };
};
