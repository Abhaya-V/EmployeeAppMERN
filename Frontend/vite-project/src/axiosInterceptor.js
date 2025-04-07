import axios from "axios"
const axiosInstance = axios.create({
    baseURL:"https://vercel.com/abhaya-s-projects/employee-app-mern/J7sUYez98RhNogLHQ5w3TpDW8scF/"
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