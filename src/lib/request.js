
const url = "https://sheesh-tv-server.vercel.app";

async function request(method, endpoint, data) {

  const options = {
    method,
    headers: {},
    credentials: 'include'
  };
  if (data instanceof FormData) {
    options.body = data

  }
  else if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }
  const token = localStorage.getItem('accessToken');

  if (token) {
      options.headers = {
          ...options.headers,
          'X-Authorization': token
      };
  }

  try {

    const response = await fetch(url + endpoint, options);
    if (response.status === 204) {
      return {}
    }
  

    const result = await response.json();

    if (!response.ok) {
      throw result
    }


    return result;

  } catch (error) {

    throw error;
  }
}

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE")