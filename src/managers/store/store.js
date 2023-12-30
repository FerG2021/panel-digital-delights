import { createStore } from 'vuex';

import usersStore from '../../modules/users/usersStore';
import productsStore from '../../modules/products/productsStore';
import categoriesStore from '../../modules/categories/categoriesStore';
import promotionsStore from '../../modules/promotions/promotionsStore';

export default createStore({
	modules: {
		UsersStore: usersStore,
		ProductsStore: productsStore,
		CategoriesStore: categoriesStore,
		PromotionsStore: promotionsStore
	}
});