import axios from "axios"
require('dotenv').config()

const axiosInstance = axios.create({
  baseURL:  process.env.REACT_APP_API_URL + ':' + process.env.REACT_APP_PORT,
  timeout: 5000,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json; charset=utf-8',
    "Access-Control-Allow-Origin": "*"
    }
})


export default axiosInstance