import axios from 'axios';

export const fileUpload = async (file) => {
  const cloudUrl = 'https://api.cloudinary.com/v1_1/dpvydp6br/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'twotter-app');
  formData.append('file', file);

  try {
    const resp = await axios.post(cloudUrl, formData);
    return resp.data.secure_url;
  } catch (error) {
    console.error(error.response);
  }
};
