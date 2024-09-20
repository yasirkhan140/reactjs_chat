import axios from "axios";
import config from "../config";

// default
axios.defaults.baseURL = config.API_URL;

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// intercepting to capture errors
axios.interceptors.response.use(
  function (response: any) {
    return response.data ? response.data : response;
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = error?.response?.data?.message;
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 400:
        message = error?.response?.data?.message;
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject({ message, error: error?.response?.data?.errors });
  },
);

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: any) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  /**
   * Fetches data from given url
   */
  get = (url: string, params?: {}) => {
    return axios.get(url, { withCredentials: true, ...params });
  };

  /**
   * post given data to url
   */
  create = (url: string, data?: {}) => {
    return axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  };

  /**
   * Updates data
   */
  update = (url: string, data?: {}) => {
    return axios.put(url, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  };

  /**
   * Delete
   */
  delete = (url: string, config?: {}) => {
    return axios.delete(url, { ...config });
  };

  /*
   file upload update method
  */
  updateWithFile = (url: string, data: any) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }
    // const config = {
    //   headers: {
    //     ...axios.defaults.headers,
    //     "content-type": "multipart/form-data",
    //   },
    // };
    // return axios.put(url, formData, config);
  };

  /*
   file upload post method
   */
  createWithFile = (url: string, data: any) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }
    // const config = {
    //   headers: {
    //     ...axios.defaults.headers,
    //     "content-type": "multipart/form-data",
    //   },
    // };
    return axios.post(url, formData);
  };
}

const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };
