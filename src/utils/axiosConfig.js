import axios from "axios";

export const appAxios = axios.create({
    baseURL:"https://nicard-api.onrender.com/api"
})