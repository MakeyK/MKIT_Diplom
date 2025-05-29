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
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
}

export const getCuratorGroup = async () => {
    try {
        const { data } = await $host.get('api/mkit/curator/my-group');
        return data.groupName;
    } catch (error) {
        console.error('Ошибка при получении группы куратора:', error);
        throw error;
    }
};