import axios from "axios";

export const get = async (endpoint, dets = {}, type = "user") => {
    const token =
        type === "admin" ? localStorage.adminToken : localStorage.token;
    const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}${endpoint}`,
        {
            params: dets,
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
            },
        }
    );
    return data;
};
