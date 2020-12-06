import axios from 'axios';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if((token!==null)&&(token!==undefined)&&(token!=="")){
      config.headers.Authorization =  `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


axios.interceptors.response.use(function (response) {
    return response;
  }, 
  function (error) {
    return Promise.reject(error);
  });

export default axios;