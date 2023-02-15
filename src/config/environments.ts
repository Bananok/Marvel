const envs = import.meta.env;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  apiKey: envs.VITE_API_KEY,
  baseApiUrl: envs.VITE_BASE_API_URL,
};
