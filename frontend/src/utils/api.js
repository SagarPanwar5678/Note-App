import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // change if your backend deployed
  timeout: 10000,
});

export default API;

//Is file me gadbad ho sakti hai
