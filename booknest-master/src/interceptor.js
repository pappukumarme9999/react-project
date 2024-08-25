import axios from "axios";
const newAxios = axios.create({
    baseURL : 'https://booknest-beckbone.onrender.com',
    timeout : 45000,
    headers : {
        "Content-Type":'application/json'
    },
});
export default newAxios;