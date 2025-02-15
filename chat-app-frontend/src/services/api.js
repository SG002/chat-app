const API_URL = 'https://truthful-love-39e9018a17.strapiapp.com';

export const registerUser = async (userData) => {
  try {
    console.log('Attempting registration with URL:', `${API_URL}/api/auth/local/register`);
    const response = await fetch(`${API_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Registration response error:', errorData);
      throw new Error(errorData.error?.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    console.log('Attempting login with URL:', `${API_URL}/api/auth/local`);
    const response = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login response error:', errorData);
      throw new Error(errorData.error?.message || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Test function to check API availability
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/api/_health`);
    return await response.json();
  } catch (error) {
    console.error('API health check failed:', error);
    throw error;
  }
};