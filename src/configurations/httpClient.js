import axios from "axios";
import { CONFIG, API } from "./configuration";
import {
  getToken,
  removeToken,
  removeUser,
  setToken,
} from "../services/localStorageService";

// Lazy import to avoid circular dependency
let storeRef = null;
let loadingActions = null;

// Function to set store reference (called after store is created)
export const setStoreReference = (store, actions) => {
  storeRef = store;
  loadingActions = actions;
};

const httpClient = axios.create({
  baseURL: CONFIG.API_GATEWAY,
  timeout: 60000, // Increased to 60 seconds for Heroku cold starts
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
httpClient.interceptors.request.use(
  function (config) {
    // Start loading for all requests except specific ones
    const skipLoading = config.headers?.skipLoading;
    if (!skipLoading && storeRef && loadingActions) {
      // Show more helpful message for production
      const isProduction = CONFIG.API_GATEWAY?.includes('herokuapp.com');
      const message = isProduction 
        ? "Loading data... (First request may take up to 30 seconds due to server startup)"
        : "Please wait while we fetch your data...";
      
      storeRef.dispatch(loadingActions.startLoading({ message }));
    }
    
    // Do something before request is sent
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Remove custom header before sending request
    delete config.headers.skipLoading;
    
    return config;
  },
  function (error) {
    // Stop loading on request error
    if (storeRef && loadingActions) {
      storeRef.dispatch(loadingActions.stopLoading());
    }
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    // Stop loading on successful response
    if (storeRef && loadingActions) {
      storeRef.dispatch(loadingActions.stopLoading());
    }
    return response;
  },
  // Do something with response error
  async function (error) {
    // Stop loading on error
    if (storeRef && loadingActions) {
      storeRef.dispatch(loadingActions.stopLoading());
    }
    
    if (error.response && error.response.status === 401) {
      try {
        const token = getToken();
        const refreshResponse = await axios.post(
          CONFIG.API_GATEWAY + API.REFRESH_TOKEN,
          { token }
        );
        // Check if refreshResponse contains a valid token
        if (refreshResponse.data.result.token) {
          const newToken = refreshResponse.data.result.token;
          console.log(newToken);
          setToken(newToken);
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axios(error.config);
        }
      } catch (refreshError) {
        removeToken();
        removeUser();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
