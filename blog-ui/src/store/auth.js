

// auth.js
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'jwtToken';

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1, sameSite: 'strict' });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const decodeJwtToken = () => {
  try {
    const token = getToken();
    if (!token) {
      return null; // Return null if there's no token
    }

    const decodedToken = jwtDecode(token);
    // You can add additional checks here based on your requirements
    // For example, check token expiration or any other criteria

    const roles = decodedToken.roles;
    const username = decodedToken.sub;
    return { roles, username };
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null; // Return null in case of an error
  }
};

// Separate function to check if the user is logged in
export const isLoggedIn = () => {
  return getToken() !== undefined; 
};


