import axios from "axios"
const axiosInstance = axios.create({
    baseURL:"https://employee-app-mern-server.vercel.app/"
})

axiosInstance.interceptors.request.use(function (config) {
    const accessToken = sessionStorage.getItem("token")
    if(accessToken){
        if(config){
            config.headers.token = accessToken
        }
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default axiosInstance