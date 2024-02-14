import { createStore } from 'vuex';

import carsStore from '../../modules/cars/carsStore';
import categoriesStore from '../../modules/categories/categoriesStore';
import clientsStore from '../../modules/clients/clientsStore';
import marksStore from '../../modules/marks/marksStore';
import notificationsStore from '../../modules/notifications/notificationsStore';
import productsStore from '../../modules/products/productsStore';
import promotionsStore from '../../modules/promotions/promotionsStore';
import usersStore from '../../modules/users/usersStore';

export default createStore({
	modules: {
		UsersStore: usersStore,
		ProductsStore: productsStore,
		CategoriesStore: categoriesStore,
		PromotionsStore: promotionsStore,
		MarksStore: marksStore,
		ClientsStore: clientsStore,
		CarsStore: carsStore,
		NotificationsStore: notificationsStore
	}
});