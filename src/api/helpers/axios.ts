import axios from "axios";

// Config
import envs from "../../config/environments";

const instance = axios.create({
  baseURL: envs.baseApiUrl,
  params: { apikey: envs.apiKey },
});

export default instance;
