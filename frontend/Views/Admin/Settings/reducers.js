import {
  UPDATE_BOARD_NAME,
  UPDATE_BOARD_NAME_SUCCESS,
  UPDATE_BOARD_NAME_FAILURE,

  UPDATE_BOARD_LOGO,
  UPDATE_BOARD_LOGO_SUCCESS,
  UPDATE_BOARD_LOGO_FAILURE
} from './constants';

const initialState = {
  fetchingSettings: false,
  error: null,

  updatingBoardName: false,
  updatingBoardNameError: null,

  updatingBoardLogo: false,
  updatingBoardLogoError: false
};

export const adminSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOARD_NAME:
      return Object.assign({}, state, {
        updatingBoardName: true,
        updatingBoardNameError: null
      });

    case UPDATE_BOARD_NAME_SUCCESS:
      return Object.assign({}, state, {
        updatingBoardName: false,
        updatingBoardNameError: null
      });

    case UPDATE_BOARD_NAME_FAILURE:
      return Object.assign({}, state, {
        updatingBoardName: false,
        updatingBoardNameError: 'Something went wrong while updating the board name'
      });

    case UPDATE_BOARD_LOGO:
      return Object.assign({}, state, {
        updatingBoardLogo: true,
        updatingBoardLogoError: null
      });

    case UPDATE_BOARD_LOGO_SUCCESS:
      return Object.assign({}, state, {
        updatingBoardLogo: false,
        updatingBoardLogoError: null
      });

    case UPDATE_BOARD_LOGO_FAILURE:
      return Object.assign({}, state, {
        updatingBoardLogo: false,
        updatingBoardLogoError: 'Something went wrong while updating the board logo'
      });

    default:
      return state;
  }
};