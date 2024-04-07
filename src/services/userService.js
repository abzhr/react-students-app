// services/userService.js

export const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8000/users');
      const users = await response.json();
      return users;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  };
  