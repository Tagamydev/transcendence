import { API_URL } from '../utils/constants.js';
import { showErrorToast, showSuccessToast } from '../utils/helpers.js';

export const usersService = {
  getUsers: async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (e) {
      console.error('Error fetching users:', e);
    }
  },
  getUser: async id => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return await response.json();
    } catch (e) {
      console.error('Error fetching user:', e);
    }
  },
  updateUser: async user => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include',
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        showErrorToast(result?.message);
        return null;
      }

      showSuccessToast(result.message);
      return result.data || result;
    } catch (e) {
      showErrorToast(`Error updating account: ${e}`);
    }
  },
  updateUserAvatar: async file => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch(`${API_URL}/users/avatar`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
        credentials: 'include',
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        showErrorToast(result?.message);
        return null;
      }

      return result.data;
    } catch (e) {
      showErrorToast(`Error updating avatar ${e}`);
      return null;
    }
  },
  deleteUser: async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 204) {
        showSuccessToast('Account successfully deleted');
        return true;
      }

      if (!response.ok) {
        showErrorToast('Error deleting account');
        return false;
      }

      return false;
    } catch (e) {
      showErrorToast(`Error deleting account: ${e}`);
      return false;
    }
  },
};
