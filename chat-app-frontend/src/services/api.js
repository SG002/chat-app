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
    
    const text = await response.text(); // First get the response as text
    let data;
    try {
      data = text ? JSON.parse(text) : {}; // Parse only if there's content
    } catch (e) {
      console.error('Failed to parse response:', text);
      throw new Error('Invalid response from server');
    }

    if (!response.ok) {
      console.error('Registration response error:', data);
      throw new Error(data.error?.message || 'Registration failed');
    }

    return data;
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

    const text = await response.text(); // First get the response as text
    let data;
    try {
      data = text ? JSON.parse(text) : {}; // Parse only if there's content
    } catch (e) {
      console.error('Failed to parse response:', text);
      throw new Error('Invalid response from server');
    }

    if (!response.ok) {
      console.error('Login response error:', data);
      throw new Error(data.error?.message || 'Login failed');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Test function to check API availability
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/api/_health`);
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch (e) {
      console.error('Failed to parse health check response:', text);
      return { status: 'error', response: text };
    }
  } catch (error) {
    console.error('API health check failed:', error);
    throw error;
  }
};