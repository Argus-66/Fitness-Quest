// Basic auth functions
export const getUser = () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

export const clearUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

export const getUserByUsername = async (username) => {
  // This would normally fetch from an API
  return null;
};

export const getCurrentUser = async () => {
  return getUser();
};

export const getSession = async () => {
  return { user: getUser() };
};

export const isAuthenticated = () => {
  return !!getUser();
};

export default {
  getUser,
  clearUser,
  getUserByUsername,
  getCurrentUser,
  getSession,
  isAuthenticated
}; 