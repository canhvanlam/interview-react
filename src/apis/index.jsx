import axios from 'axios';
const apiCall = (method, endpoint, data = null, headers = null, baseUrl = null) => {
    axios.defaults.baseURL = baseUrl ? baseUrl : import.meta.env.VITE_APP_API_URL;
    const url = `${endpoint}`;
    return axios({
      method,
      url,
      data,
      headers,
    });
  };
  
  export default apiCall;
  