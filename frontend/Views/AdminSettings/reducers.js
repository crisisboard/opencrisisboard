import {
  GET_SETTINGS_INFO_START,
  GET_SETTINGS_INFO_SUCCESS,
  GET_SETTINGS_INFO_FAILURE,

  UPDATE_BOARD_NAME,
  UPDATE_BOARD_NAME_SUCCESS,
  UPDATE_BOARD_NAME_FAILURE,

  UPDATE_BOARD_LOGO,
  UPDATE_BOARD_LOGO_SUCCESS,
  UPDATE_BOARD_LOGO_FAILURE
} from './constants';

const initialState = {
  // TODO: fill in initialState object appropriately
};

export const adminSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS_INFO_START:
      return Object.assign({}, state, {
        // TODO: fill this in appropriately
      });

    case GET_SETTINGS_INFO_SUCCESS:
      return Object.assign({}, state, {
        // TODO: fill this in appropriately
      });

    case GET_SETTINGS_INFO_FAILURE:
      return Object.assign({}, state, {
        // TODO: fill this in appropriately
      });

    case UPDATE_BOARD_NAME:
      return Object.assign({}, state, {
        // TODO: fill this in appropriately
      });

    case UPDATE_BOARD_NAME_SUCCESS:
      return Object.assign({}, state, {
        // TODO: fill this in appropriately
      });

    case UPDATE_BOARD_NAME_FAILURE:
      return Object.assign({}, state, {
        // TODO: fill this in appropriately
      });

    case UPDATE_BOARD_LOGO:
      return Object.assign({}, state, {
        // TODO: fill this in appropriately
      });

    case UPDATE_BOARD_LOGO_SUCCESS:
      return Object.assign({}, state, {
        // TODO: fill this in appropriately
      });

    case UPDATE_BOARD_LOGO_FAILURE:
      return Object.assign({}, state, {
        // TODO: fill this in appropriately
      });
  }
};