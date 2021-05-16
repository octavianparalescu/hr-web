const axios = require("axios");
const apiHost = process.env.REACT_APP_API_ADDRESS;
export const axiosInstance = axios.create({
    baseURL: `${apiHost}/`,
    timeout: 60000,
    withCredentials: true,
});