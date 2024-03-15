import axios from 'axios';

import Store from '../store/store';

export const getAllMarks = async (id) => {
	await axios.get(`/api/marks/${id}`)
		.then((response) => {
			Store.commit('MarksStore/setMarks', response.data.data);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const newMark = (id, data) => {
	return axios.post(`/api/mark/${id}`, data);
};

export const updateMark = (id, data) => {
	return axios.post(`/api/mark/update/${id}`, data);
};

export const deleteMark = (id, mark) => {
	return axios.post(`/api/mark/delete/${id}`, mark);
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

export const getAllClients = async (id) => {
	await axios.get(`/api/clients/${id}`)
		.then((response) => {
			Store.commit('ClientsStore/setClients', response.data.data);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const newClient = (id, data) => {
	return axios.post(`/api/client/${id}`, data);
};

export const updateClient = (id, data) => {
	return axios.post(`/api/client/update/${id}`, data);
};

export const deleteClient = (id, client) => {
	return axios.post(`/api/client/delete/${id}`, client);
};

export const getAllCars = async (id) => {
	await axios.get(`/api/cars/${id}`)
		.then((response) => {
			Store.commit('CarsStore/setCars', response.data.data);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const newCar = (id, data) => {
	return axios.post(`/api/car/${id}`, data);
};

export const updateCar = (id, data) => {
	return axios.post(`/api/car/update/${id}`, data);
};

export const deleteCar = (id, car) => {
	return axios.post(`/api/car/delete/${id}`, car);
};

export const sellCar = (id, data) => {
	return axios.post(`/api/car/sell/${id}`, data);
};

export const getAllNotifications = async (id) => {
	await axios.get(`/api/notifications/${id}`)
		.then((response) => {
			Store.commit('NotificationsStore/setNotifications', response.data.data);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const readNotification = (id, arrayNotificacion) => {
	return axios.post(`/api/notifications/read/${id}`, arrayNotificacion);
};

export const getAllMonthlyFees = async (id) => {
	await axios.get(`/api/car/monthlyFees/${id}`)
		.then((response) => {
			Store.commit('MonthlyFeesStore/setMonthlyFees', response.data.data);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const collectFee = (id, data) => {
	return axios.post(`/api/car/monthlyFees/collectfee/${id}`, data);
};
