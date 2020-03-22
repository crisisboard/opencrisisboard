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

import {
  fetchSettings
} from '../../../App/api';

import {
  START_FETCHING_SETTINGS,
  FETCHING_SETTINGS_SUCCESS,
  FETCHING_SETTINGS_FAILURE
} from '../../../App/constants';

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
        dispatch({ type: UPDATE_BOARD_NAME_SUCCESS, payload: data.data });

        dispatch({ type: START_FETCHING_SETTINGS });

        // Refresh the settings data
        fetchSettings()
        .then(
          data => dispatch({ type: FETCHING_SETTINGS_SUCCESS, payload: data.data }),
          error => dispatch({ type: FETCHING_SETTINGS_FAILURE, payload: error })
        );
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
        // Refresh the settings data
        dispatch({ type: START_FETCHING_SETTINGS });
        fetchSettings()
        .then(
          data => dispatch({ type: FETCHING_SETTINGS_SUCCESS, payload: data.data }),
          error => dispatch({ type: FETCHING_SETTINGS_FAILURE, payload: error })
        );
      },
      error => dispatch({ type: UPDATE_BOARD_LOGO_FAILURE, payload: error })
    );
  }
};