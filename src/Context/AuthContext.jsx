import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

export const BASE_URL = "https://aguero.pythonanywhere.com";

const AuthContext = createContext();
const initialState = {
  user: {},
  isLoading: false,
  isAuthenticated: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "register":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: "",
      };
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: "",
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false, isLoading: false };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "stopLoading":
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error("Unknown action");
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      async function getUserData() {
        try {
          dispatch({ type: "loading" });
          const userRes = await axios.get(`${BASE_URL}/auth/users/me`, {
            headers: {
              Authorization: `JWT ${token}`,
            },
          });
          dispatch({ type: "login", payload: userRes.data });
        } catch (err) {
          console.error("Error fetching user data:", err);
          // Handle error appropriately
        } finally {
          dispatch({ type: "stopLoading" });
        }
      }
      getUserData();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserFromToken(token);
    }
  }, []);

  async function getUserFromToken(token) {
    try {
      dispatch({ type: "loading" });
      const userRes = await axios.get(`${BASE_URL}/auth/users/me`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      dispatch({ type: "login", payload: userRes.data });
    } catch (err) {
      console.error("Error fetching user data from token:", err);
      dispatch({ type: "logout" });
    } finally {
      dispatch({ type: "stopLoading" });
    }
  }

  // In AuthProvider.js

  async function register(userData) {
    console.log(userData);
    try {
      dispatch({ type: "loading" });

      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log("formdta", formData);

      const res = await axios.post(`${BASE_URL}/auth/users/`, formData);
      dispatch({ type: "register", payload: res.data.user });
      //login starts
      dispatch({ type: "loading" });
      let username = userData.username;
      let password = userData.password;
      const response = await axios.post(`${BASE_URL}/auth/jwt/create`, {
        username,
        password,
      });

      if (response.status === 200 && response.data.access) {
        localStorage.setItem("token", response.data.access);
        dispatch({ type: "login", payload: response.data.user });
        console.log("this is login");
      }

      //login ends
      if (res.data) {
        alert("Registered successfully");
      }

      return res.data;
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There is an error registering the user...",
      });
    } finally {
      dispatch({ type: "stopLoading" });
    }
  }

  async function login(username, password) {
    try {
      dispatch({ type: "loading" });
      const res = await axios.post(`${BASE_URL}/auth/jwt/create`, {
        username,
        password,
      });

      if (res.status === 200 && res.data.access) {
        localStorage.setItem("token", res.data.access);
        dispatch({ type: "login", payload: res.data.user });
        alert("Logged in successfully");
      }
      return res.data.access;
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Incorrect combination of username and password...",
      });
    } finally {
      dispatch({ type: "stopLoading" });
    }
  }

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        isLoading,
        user,
        isAuthenticated,
        error,
        getUserFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext used outside provider");
  return context;
}

export { AuthProvider, useAuth };
