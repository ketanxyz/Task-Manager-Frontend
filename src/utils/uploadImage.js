import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const res = await axiosInstance.post(API_PATHS.AUTH.UPLOAD_IMAGE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.imageUrl;
};

export default uploadImage;
