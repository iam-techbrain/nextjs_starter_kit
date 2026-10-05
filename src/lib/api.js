/**
 * API Service Layer for DummyJSON endpoints
 * 
 * Provides clean async/await functions for:
 * 1. Login API: POST https://dummyjson.com/auth/login
 * 2. Products API: GET https://dummyjson.com/products
 * 3. Users API: GET https://dummyjson.com/users
 */

const BASE_URL = 'https://dummyjson.com';

/**
 * 1. Login API
 * Sends POST request with username and password.
 * Returns user profile object with token upon success.
 */
export async function loginUser(username, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.trim(),
      password: password,
      expiresInMins: 60,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Authentication failed. Please check your credentials.');
  }

  return data;
}

/**
 * 2. Products API
 * Fetches products list with optional search query or category filter.
 */
export async function fetchProducts({ search = '', category = '', limit = 16 } = {}) {
  let url = `${BASE_URL}/products?limit=${limit}`;

  if (search.trim()) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(search.trim())}&limit=${limit}`;
  } else if (category && category !== 'all') {
    url = `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch products from DummyJSON.');
  }

  return data;
}

/**
 * 3. Users API
 * Fetches list of users with pagination.
 */
export async function fetchUsers(limit = 12) {
  const response = await fetch(`${BASE_URL}/users?limit=${limit}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch users from DummyJSON.');
  }

  return data;
}

/**
 * 4. Product Categories API
 * Helper to get available product categories for filtering.
 */
export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`);
  const data = await response.json();

  if (!response.ok) {
    return [];
  }

  return data;
}
