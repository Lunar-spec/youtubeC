import axios from "axios";

const token = localStorage.getItem("token")

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const createChannel = async (formData) => {
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }

    console.log(token);

    try {
        const res = await axios.post(`${BASE_URL}/channels`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log(res);

        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        return {
            error: error.response.data.error
        };
    }
}

export const getUserMe = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            return res.data;
        } else {
            return null
        }
    } catch (error) {
        return {
            error: error.response.data.error
        };
    }
}