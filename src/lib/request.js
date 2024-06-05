
const url = "http://localhost:3000";

async function request(method, endpoint, data) {
  const options = {
    method,
    headers: {},
  };
  if (data instanceof FormData) {
    console.log('yes');
    options.body = data

  }
  else if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }


  try {
    console.log(options);
    console.log(url + endpoint);
    const response = await fetch(url + endpoint, options);


    return await response.json();
  } catch (error) {

    alert(error.message);
    throw error;
  }
}

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE")