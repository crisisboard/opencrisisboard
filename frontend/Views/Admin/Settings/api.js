import axios from 'axios';

// TODO: Implement these API endpoints in the backend

// Function that issues a GET request to receive the current name and logo for the board
export const getAdminSettingsAPI = () => {
  return axios.get('/api/admin/admin_settings');
};

// Function that issues a PUT request to update the current board's name
export const updateAdminBoardNameAPI = (new_board_name) => {
  return axios.put('/api/admin/name', {
    new_board_name
  });
};

// Function that issues a PUT request to update the current board's logo
export const updateAdminBoardLogoAPI = (new_board_logo_URL) => {
  return axios.put('/api/admin/logo', {
    new_board_logo_URL
  });
};