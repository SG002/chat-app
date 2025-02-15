const API_URL = 'https://truthful-love-39e9018a17.strapiapp.com';

export const registerUser = async (userData) => {
  console.log('Starting registration process...');
  console.log('API URL:', API_URL);
  console.log('Registration endpoint:', `${API_URL}/api/auth/local/register`);
  
  try {
    const response = await fetch(`${API_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response text:', errorText);
      
      try {
        const errorData = errorText ? JSON.parse(errorText) : { error: 'Unknown error' };
        throw new Error(errorData.error?.message || 'Registration failed');
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
        throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
      }
    }

    const text = await response.text();
    console.log('Response text:', text);

    if (!text) {
      throw new Error('Empty response from server');
    }

    try {
      const data = JSON.parse(text);
      console.log('Parsed response:', data);
      return data;
    } catch (parseError) {
      console.error('Error parsing success response:', parseError);
      throw new Error('Invalid response format from server');
    }
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  console.log('Starting login process...');
  
  try {
    const response = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response text:', errorText);
      
      try {
        const errorData = errorText ? JSON.parse(errorText) : { error: 'Unknown error' };
        throw new Error(errorData.error?.message || 'Login failed');
      } catch (parseError) {
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      }
    }

    const text = await response.text();
    console.log('Response text:', text);

    if (!text) {
      throw new Error('Empty response from server');
    }

    try {
      const data = JSON.parse(text);
      console.log('Parsed response:', data);
      return data;
    } catch (parseError) {
      throw new Error('Invalid response format from server');
    }
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