import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1';

export const getPhoneNumbers = async ({ batch, page }) => {
  const { data } = await axios.get(`${baseURL}/numbers/${batch}?page=${page}`);
  return data;
};

export const generatePhoneNumbers = async () => {
  const { data } = await axios.post(`${baseURL}/numbers`);
  return data;
};

export const getNumberBatches = async () => {
  const { data } = await axios.get(`${baseURL}/batches`);
  return data;
};
