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
  // In a real implementation, this would verify the session token
  // and return the current user's information
  try {
    // For now, check if we have a user in localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const getSession = async () => {
  return { user: getUser() };
};

export const isAuthenticated = async () => {
  const user = await getCurrentUser();
  return !!user;
};

export const login = async (email, password) => {
  try {
    // This would normally call your API
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    // Store user data in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  // Clear user data from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
  
  // In a real app, you would also invalidate the session on the server
  // by calling an API endpoint
};

export default {
  getUser,
  clearUser,
  getUserByUsername,
  getCurrentUser,
  getSession,
  isAuthenticated,
  login,
  logout
}; 