import axios from "axios";

export const put = async (endpoint, body, type = "user") => {
  const token = type === "admin" ? localStorage.adminToken : localStorage.token;
  const { data } = await axios.put(
    `${process.env.REACT_APP_API_URL}${endpoint}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }
  );

  return data;
};