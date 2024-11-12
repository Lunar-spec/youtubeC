import axios from "axios";
import api from "../config/axios";

const token = localStorage.getItem('token')

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const getAllVideos = async () => {
    try {
        const res = await api.get('/videos')
        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        return {
            error: error.response.data.error
        }
    }
}

export const getVideo = async (videoId) => {
    try {
        const res = await api.get(`/videos/${videoId}`)
        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        return {
            error: error.response.data.error
        }
    }
}

export const deleteVideo = async (videoId) => {
    try {
        const res = await api.delete(`channels/video/${videoId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        return {
            error: error.response.data.error
        }
    }
}

export const uploadVideo = async (formData) => {
    for (const [key, value] of formData.entries()) {
        console.log(key, value)
    }
    try {
        const res = await axios.post(`${BASE_URL}/channels/videos`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(res)

        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return {
            error: error.response.data.error
        }
    }
};

export const likeVideo = async (videoId) => {
    try {
        const res = await api.post(`/videos/${videoId}/like`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || 'Error liking video'
        };
    }
};

export const dislikeVideo = async (videoId) => {
    try {
        const res = await api.post(`/videos/${videoId}/dislike`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || 'Error disliking video'
        };
    }
};

export const addComment = async (videoId, content) => {
    try {
        const res = await api.post(`/videos/${videoId}/comments`,
            { content },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || 'Error posting comment'
        };
    }
};

export const likeComment = async (commentId) => {
    try {
        const res = await api.post(`/comments/${commentId}/like`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || 'Error liking comment'
        };
    }
};

export const dislikeComment = async (commentId) => {
    try {
        const res = await api.post(`/comments/${commentId}/dislike`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || 'Error disliking comment'
        };
    }
};

export const getVideoStats = async (videoId) => {
    try {
        const res = await api.get(`/videos/${videoId}/stats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || 'Error getting video stats'
        };
    }
}

export const getCommentsStats = async (commentId) => {
    try {
        const res = await api.get(`/comments/${commentId}/stats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || 'Error getting comments stats'
        };
    }
}

export const searchQuery = async (query) => {
    try {
        const res = await api.get(`/search?query=${encodeURIComponent(query.trim())}`);
        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || 'Error searching video'
        };
    }
}