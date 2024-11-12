import api from "../config/axios";

export const login = async (email, password) => {
    try {
        const res = await api.post('/auth/login', { email, password });
        if (res.data.success) {
            return res.data;
        } else {
            return null;
        }
    } catch (error) {
        // console.log(error.response.data.error);
        return {
            error: error.response.data.error
        };
    }
}

export const registerUser = async (email, password, name) => {
    try {
        const res = await api.post('/auth/register', { email, password, name });

        console.log(res)

        if (res.data.success) {
            return res.data;
        } else {
            return null;
        }
    } catch (error) {
        // console.log(error);
        return {
            error: error.response.data.error
        };
    }
}