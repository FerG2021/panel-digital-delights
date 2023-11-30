import axios from 'axios';
import Store from '../store/store';

export const getProducts = () => {
	return axios.get('/api/producto');
};

export const getAllCategories = async (id) => {
	await axios.get(`/api/categories/${id}`)
		.then((response) => {
			Store.commit('CategoriesStore/setCategories', response.data.data);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const newCategory = (id, data) => {
	return axios.post(`/api/category/${id}`, data);
};

export const updateCategory = (id, data) => {
	return axios.post(`/api/category/update/${id}`, data);
};

export const deleteCategory = (id, category) => {
	return axios.post(`/api/category/delete/${id}`, category);
};

export const getAllProducts = async (id) => {
	await axios.get(`/api/products/${id}`)
		.then((response) => {
			Store.commit('ProductsStore/setProducts', response.data.data);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const newProduct = (id, data) => {
	return axios.post(`/api/product/${id}`, data);
};

export const updateProduct = (id, data) => {
	return axios.post(`/api/product/update/${id}`, data);
};

export const deleteProduct = (id, category) => {
	return axios.post(`/api/product/delete/${id}`, category);
};

export const updateUserData = (id, accountData) => {
	return axios.put(`/api/my-account/update/${id}`, accountData);
};