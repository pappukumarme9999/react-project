import axios from "axios";
const newAxios = axios.create({

    baseURL : 'http://localhost:3006',
    timeout : 45000,
    headers : {
        "Content-Type":'application/json',
        "Accept": 'application/json'
    },
    withCredentials: true
});
export default newAxios;

    // baseURL : 'https://booknest-beckbone.onrender.com',
    // baseURL : 'https://pustakalaya-beckbone.onrender.com',