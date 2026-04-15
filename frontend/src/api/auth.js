import API from "./axios";

export const getProtectedUser = () => API.get("/api/test/user");

export const getPublic = () => API.get("/api/public");

export const getUsers = () => API.get("/api/users");

export const getAdmin = () => API.get("/api/test/admin");

export const signup = (data) => API.post("/api/auth/signup", data);

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return API.post("/api/files/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
