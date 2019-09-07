import axios from 'axios';

export function buildRequestArgs(obj, glue = '=', separator = '&') {
  const str = [];
  Object.keys(obj).forEach((p) => {
    str.push(encodeURIComponent(p) + glue + encodeURIComponent(obj[p]));
  });
  return str.join(separator);
}

export async function runGet(path, args = {}) {
  /**
   * currently the result result of a failed axios query is obscure
   */
  let result = null;
  const queryString = `${path}?${buildRequestArgs(args)}`;
  await axios.get(queryString)
    .then((response) => {
      console.debug(response);
      result = response;
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        console.error(error.response);
        throw error.response.data.error;
      } else {
        throw error;
      }
    });
  return (result) ? result.data : null;
}

export async function runPost(path, args = {}, body = {}) {
  let result = null;
  const queryString = `${path}?${buildRequestArgs(args)}`;
  await axios.post(queryString, body)
    .then((response) => {
      console.debug(response);
      result = response;
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        console.error(error.response);
        throw error.response.data;
      } else {
        throw error;
      }
    });
  console.log(result);
  return (result) ? result.data : null;
}
