import {
  UPDATE_BOARD_NAME,
  UPDATE_BOARD_NAME_SUCCESS,
  UPDATE_BOARD_NAME_FAILURE,

  UPDATE_BOARD_LOGO,
  UPDATE_BOARD_LOGO_SUCCESS,
  UPDATE_BOARD_LOGO_FAILURE
} from './constants';

import {
  updateAdminBoardNameAPI,
  updateAdminBoardLogoAPI
} from './api';

/**
 * update the current board name
 * @param {string} newBoardName
 * @return {action}
 */
export const updateAdminBoardName = (newBoardName) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_BOARD_NAME });

    updateAdminBoardNameAPI(newBoardName).then(
      data => {
        dispatch({ type: UPDATE_BOARD_NAME_SUCCESS, payload: data.data })
      },
      error => dispatch({ type: UPDATE_BOARD_NAME_FAILURE, payload: error })
    );
  }
};

/**
 * update the current board logo
 * @param {string} newBoardLogoURL
 * @return {action}
 */
export const updateAdminBoardLogo = (newBoardLogoURL) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_BOARD_LOGO });

    updateAdminBoardLogoAPI(newBoardLogoURL).then(
      data => {
        dispatch({ type: UPDATE_BOARD_LOGO_SUCCESS, payload: data.data })
      },
      error => dispatch({ type: UPDATE_BOARD_LOGO_FAILURE, payload: error })
    );
  }
};