/**
 * user profile apis
 */

import axios from 'axios';

export const fetchAuthViaPhone = (name, number) => {
  return axios.get(`/api/user/authViaPhone?name=${name}&number=${number}`);
};
