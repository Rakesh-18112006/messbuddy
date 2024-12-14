// Utility functions for handling authentication-related tasks

// Get the current user from localStorage
export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Check if the user is authenticated and the token is not expired
export const isAuthenticated = () => {
    const user = getUser();
    // Ensure the user exists, has a token, and the token is not expired
    return user && user.token && !isTokenExpired(user) ? true : false;
};

// Check if the token has expired
export const isTokenExpired = (user) => {
    // Check if expiryTime is set and whether the current time exceeds it
    return user && user.expiryTime && Date.now() > user.expiryTime;
};

// Get the authentication token, if it is not expired
export const getAuthToken = () => {
    const user = getUser();
    console.log('Retrieved User:', user); // Debug user object
    if (user && user.token && !isTokenExpired(user)) {
        console.log('Token:', user.token); // Debug token before returning
        return user.token;
    }
    console.log('Token expired or not found'); // Debug missing token
    return null;
};



// Save the user data (for example after login), along with token expiry time
export const saveUser = (userData) => {
    const expiryTime = Date.now() + userData.tokenExpiry * 1000; // Assuming `tokenExpiry` is in seconds
    const data = { ...userData, expiryTime, token: userData.token };
    console.log('Saving User Data:', data); // Debug user data being saved
    localStorage.setItem('user', JSON.stringify(data));
};


// Remove user data (for example after logout)
export const removeUser = () => {
    localStorage.removeItem('user');
};

// Utility function to add Authorization header for protected routes
export const getAuthHeader = () => {
    const token = getAuthToken();
    console.log('Token:', token); // Debugging
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
};

export const checkTokenValidity = () => {
    const token = localStorage.getItem("jwt");
    if (!token) return false;
  
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    const isTokenExpired = payload.exp * 1000 < Date.now();
  
    if (isTokenExpired) {
      localStorage.removeItem("jwt");
      return false;
    }
  
    return true;
  };