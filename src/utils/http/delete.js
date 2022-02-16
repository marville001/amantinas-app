import axios from "axios";

export const delete_ = async (endpoint, body) => {
    const token = localStorage.adminToken;
    const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}${endpoint}`,
        {
            data: body,
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
            },
        }
    );

    return data;
};
