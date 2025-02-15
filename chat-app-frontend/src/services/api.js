const API_URL = 'http://localhost:1337';

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/local/register`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Registration failed');
    }

    return await response.json();
  } catch(error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to server.');
    }
    console.error('Registration error:',error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: credentials.identifier,
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server.');
    }
    console.error('Login error:', error);
    throw error;
  }
};