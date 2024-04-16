import axios from "axios";

const Api = axios.create({
    baseURL: 'https://vm.caioruiz.com/chat-backend',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default Api;