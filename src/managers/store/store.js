import { createStore } from 'vuex';

import usersStore from '../../modules/users/usersStore';
import productsStore from '../../modules/products/productsStore';
import categoriesStore from '../../modules/categories/categoriesStore';
import promotionsStore from '../../modules/promotions/promotionsStore';
import marksStore from '../../modules/marks/marksStore';
import clientsStore from '../../modules/clients/clientsStore';
import carsStore from '../../modules/cars/carsStore';

export default createStore({
	modules: {
		UsersStore: usersStore,
		ProductsStore: productsStore,
		CategoriesStore: categoriesStore,
		PromotionsStore: promotionsStore,
		MarksStore: marksStore,
		ClientsStore: clientsStore,
		CarsStore: carsStore
	}
});