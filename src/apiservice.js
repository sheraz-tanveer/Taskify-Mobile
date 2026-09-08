// src/services/api.js

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetches dynamic data from the external API.
 * @param {number} limit - The maximum number of items to retrieve.
 * @returns {Promise<Array>} - Resolves to an array of items fetched from the API.
 */
export const fetchApiData = async (limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?_limit=${limit}`);
    
    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`Network response failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching external API data:', error);
    throw error;
  }
};
