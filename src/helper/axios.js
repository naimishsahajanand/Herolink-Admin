import axios from "axios";

// Admin Header
export const authHeader = () => {
    const token = localStorage.getItem("Admin-Token-Herolinks");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }

}
export const authImageHeader = () => {
    const token = localStorage.getItem("Admin-Token-Herolinks");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    }
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_ADMIN_API,
})

export default axiosInstance