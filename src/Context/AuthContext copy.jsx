import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
 
const StateContext = createContext({
  authenticated: false,
  user: null,
  loading: true,
});
 
const DispatchContext = createContext(null);
 
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        authenticated: true,
        user: payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    case 'POPULATE':
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};
 
export const AuthProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });
 
  const dispatch = (type, payload) => defaultDispatch({ type, payload });
 
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token === null || token === undefined) {
          return;
        }
        const res = await axios.get('/profile', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch('LOGIN', res.data.data);
      } catch (err) {
        console.log(err);
        localStorage.removeItem('token');
      } finally {
        dispatch('STOP_LOADING');
      }
    };
 
    loadUser();
    // eslint-disable-next-line
  }, []);
 
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
 
export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);