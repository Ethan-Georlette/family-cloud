import API from "./axios";

export const login = async (data) => {
    const res = await API.post("/login", data);
    const { accessToken, refreshToken, email,fullname, userId,expiresIn, role } = res.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    
    localStorage.setItem("user", JSON.stringify({
        email,
        fullname,
        userId,
        expiresIn,
        role
    }));

    return res;
};
export const signup = (data) => API.post("", data);

export const getUsers = () => {
    return API.get("").then(res => res.data);
};