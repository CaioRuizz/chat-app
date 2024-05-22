import axios from "axios";

const Api = axios.create({
    baseURL: 'https://vm.caioruiz.com/chat-backend',
    // baseURL: 'http://192.168.15.10:3000',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default Api;