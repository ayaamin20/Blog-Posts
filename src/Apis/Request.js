import axios from "axios";
const RequestHandler = {
  handleRequests: (subUrl, data, method) => {
    let url = `https://jsonplaceholder.typicode.com/${subUrl}`;
    return new Promise((resolve, reject) => {
      let headers = { "Content-type": "application/json; charset=UTF-8" };
      axios({ method, url, data, headers })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const Request = {
  post: (subUrl, data) => {
    return RequestHandler.handleRequests(subUrl, data, "POST");
  },
  get: (subUrl, params) => {
    return RequestHandler.handleRequests(subUrl, params, "GET");
  },
};

export default Request;
