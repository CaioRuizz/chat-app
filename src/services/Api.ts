import axios from "axios";

const Api = new axios.Axios({
    baseURL: 'https://vm.caioruiz.com/chat-backend',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default Api;