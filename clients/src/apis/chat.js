import axios from 'axios';
import { toast } from 'react-toastify';
const API = (token) =>
  axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: { Authorization: token },
  });
export const acessCreate = async (body) => {
  try {
    const token = localStorage.getItem('userToken');

    const { data } = await API(token).post('/api/chat', body);
    console.log(data);
    return data;
  } catch (error) {
    console.log('error in access create api');
  }
};
export const fetchAllChats = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).get('/api/chat');
    return data;
  } catch (error) {
    console.log('error in fetch all chats api');
  }
};
export const createGroup = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).post('/api/chat/group', body);
    toast.success(`${data.chatName} Group Created`);
    return data;
  } catch (error) {
    console.log('error in create group api');
  }
};
export const addToGroup = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).patch('/api/chat/groupAdd', body);
    return data;
  } catch (error) {
    console.log('error in addtogroup api');
  }
};
export const renameGroup = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).patch('/api/chat/group/rename', body);
    return data;
  } catch (error) {
    console.log('error in rename group api');
  }
};
export const removeUser = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).patch('/api/chat/groupRemove', body);
    return data;
  } catch (error) {
    console.log('error in remove user api');
  }
};
