import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode';

export const registration = async (login, password, email, secretKey) => {
    try {
        const { data } = await $host.post('api/mkit/registration', { login, password, email, secretKey });
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    } catch (error) {
        throw error;
    }
}

export const login = async (login, password) => {
    try {
        const { data } = await $host.post('api/mkit/login', { login, password });
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
        
    } catch (error) {
        throw error;
    }
}