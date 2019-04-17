import axios from 'axios';

const { baseURL } = process.env;

export const getPhoneNumbers = async ({ batch, page, order }) => {
  const { data } = await axios.get(`${baseURL}/numbers/${batch}?page=${page}&sort=${order}`);
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
