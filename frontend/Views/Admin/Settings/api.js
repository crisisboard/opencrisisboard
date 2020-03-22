import axios from 'axios';

// Function that issues a PUT request to update the current board's name
export const updateAdminBoardNameAPI = (new_board_name) => {
  return axios.put('/api/settings/name', {
    new_board_name
  });
};

// Function that issues a PUT request to update the current board's logo
export const updateAdminBoardLogoAPI = (new_board_logo_URL) => {
  return axios.put('/api/settings/logo', {
    new_board_logo_URL
  });
};