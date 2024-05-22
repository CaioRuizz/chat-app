import axios from "axios";

export const defaultUrl = 'https://vm.caioruiz.com/chat-backend'

const Api = (url: string) => axios.create({
    baseURL: url,
    // baseURL: 'http://192.168.15.10:3000',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default Api;