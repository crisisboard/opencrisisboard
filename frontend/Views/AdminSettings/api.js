import axios from 'axios';

// Function that issues a GET request to receive the current name and logo for the board
export const getAdminSettingsInfoAPI = () => {
  // TODO: Implement this API endpoint
  return axios.get('/api/admin/admin_settings_info');
};

// Function that issues a PUT request to update the current board's name
export const updateAdminBoardNameAPI = (new_board_name) => {
  // TODO: Implement this API endpoint
  return axios.put('/api/admin/admin_change_board_name', {
    new_board_name
  });
};

// Function that issues a PUT request to update the current board's logo
export const updateAdminBoardLogoAPI = (new_board_logo_url) => {
  // TODO: Implement this API endpoint
  return axios.put('/api/admin/admin_change_board_logo', {
    new_board_logo_url
  });
};