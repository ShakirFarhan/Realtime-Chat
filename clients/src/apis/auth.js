import axios from "axios";
const url = "http://localhost:8000";
export const loginUser = async (body) => {
  try {
    return await axios.post(`${url}/auth/login`, body);
  } catch (error) {
    console.log("error in loginuser api");
  }
};
export const googleAuth = async (body) => {
  try {
    return await axios.post(`${url}/api/google`, body);
  } catch (error) {
    console.log(error);
  }
};
export const registerUser = async (body) => {
  try {
    return await axios.post(`${url}/auth/register`, body);
  } catch (error) {
    console.log("error in register api");
  }
};
export const validUser = async () => {
  try {
    const token = localStorage.getItem("userToken");

    const { data } = await axios.get(`${url}/auth/valid`, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log("error in valid user api");
  }
};
