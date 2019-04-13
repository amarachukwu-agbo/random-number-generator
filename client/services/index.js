import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1';

export const getPhoneNumbers = async (page) => {
  const { data } = await axios.get(`${baseURL}/numbers?page=${page}`);
  return data;
};

// export const generatePhoneNumbers = async () => {
//   const numbers = await axios.post(`${baseURL}/numbers`);
//   return numbers;
// };

export const getMinMaxNumbers = async () => {
  const { data } = await axios.get(`${baseURL}/numbers/minMax`);
  return data;
};
