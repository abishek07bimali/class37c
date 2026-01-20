import axios from 'axios';

const ApiFormData = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

const config = {
  headers: {
    'authorization': `Bearer ${localStorage.getItem("token-37c")}`
  }
}


export const createUserApi = (data) => Api.post("/api/user/register", data);
export const loginUserApi = (data) => Api.post("/api/user/login", data)
export const getUser = () => Api.get("/api/user/getallUsers",config)
export const deleteUserById = (data) => Api.delete(`/api/user/deleteuser/${data}`,config)
export const getUserById = (id) => Api.get(`/api/user/getUserByid/${id}`,config)
export const updateUserById = (id,data) => Api.put(`/api/user/updateUserByid/${id}`,data,config)
export const getMe = () => Api.get('/api/user/getMe',config)


export const createProductApi = (data) =>ApiFormData.post("/api/product/addProduct", data, config);
export const getAllProductsApi = () =>Api.get("/api/product/getProduct");
export const updateProductApi = (id) =>Api.delete(`/api/product/updateProduct/${id}`, config);
