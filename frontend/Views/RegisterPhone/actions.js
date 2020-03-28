import {
  FETCH_PHONE_REGISTER_START,
  FETCH_PHONE_REGISTER_SUCCESS,
  FETCH_PHONE_REGISTER_FAILURE,
} from './constants';

import {
  fetchAuthViaPhone,
} from './api';

/**
 * fetch the users profile from the server
 * @param  {String} userSlug
 * @return {action}
 */
export const fetchRegisterPhone = (name, number, resolve) => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_PHONE_REGISTER_START });

    fetchAuthViaPhone(name, number).then(
      data => {
        if (data.data.error) {
          dispatch({ type: FETCH_PHONE_REGISTER_FAILURE })
        } else {
          dispatch({ type: FETCH_PHONE_REGISTER_SUCCESS, payload: data.data });
          if (resolve) resolve(data.data);
        };
      },
      error => dispatch({ type: FETCH_PHONE_REGISTER_FAILURE })
    );
  };
};
