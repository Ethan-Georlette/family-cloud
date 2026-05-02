import API from "./axios";

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return API.post("/api/files/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getFiles = () => API.get("/api/files/preview");

export const deleteFile = (fileName) => API.delete(`/api/files/${fileName}`);