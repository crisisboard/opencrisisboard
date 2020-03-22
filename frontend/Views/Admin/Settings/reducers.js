import {
  GET_SETTINGS_START,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILURE,

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
  settings: {
    boardName: '',
    boardLogoImage: ''
  },

  updatingBoardName: false,
  updatingBoardNameError: null,

  updatingBoardLogo: false,
  updatingBoardLogoError: false
};

export const adminSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS_START:
      return Object.assign({}, state, {
        fetchingSettings: true,
        error: null
      });

    case GET_SETTINGS_SUCCESS:
      return Object.assign({}, state, {
        fetchingSettings: false,
        settings: action.payload,
        error: null
      });

    case GET_SETTINGS_FAILURE:
      return Object.assign({}, state, {
        fetchingSettings: false,
        error: 'Something went wrong while fetching the current admin settings'
      });

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