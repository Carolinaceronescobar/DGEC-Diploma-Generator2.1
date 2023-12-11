import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

// Extend AxiosRequestConfig to include the _retry property
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const setupAxiosInterceptors = (onLogout: () => void): void => {
  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (!error.config) {
        return Promise.reject(error);
      }

      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(
            "http://localhost:8000/refresh-token",
            {
              // Necessary data for refresh token request
            }
          );

          const newToken = response.data.access_token as string;
          axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

          // Ensure originalRequest.headers exists before setting the Authorization header
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          return axios(originalRequest);
        } catch (refreshError) {
          onLogout();
          console.error("Token refresh failed:", refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
