// bunker
import bunkerproducts from '../modules/products/bunker.configuration';
import bunkercategories from '../modules/categories/bunker.configuration';
import bunkerpromotions from '../modules/promotions/bunker.configuration';
import bunkermyaccount from '../modules/myaccount/bunker.configuration';

// lalo-automotores
import lalomarks from '../modules/categories/lalo.configuration';
import laloproducts from '../modules/products/lalo.configuration';
import lalopromotions from '../modules/promotions/lalo.configuration';
import lalomyaccount from '../modules/myaccount/lalo.configuration';

const configurations = {
	bunker: {
		products: bunkerproducts,
		categories: bunkercategories,
		promotions: bunkerpromotions,
		myaccount: bunkermyaccount
	},
	lalo: {
		categories: lalomarks,
		products: laloproducts,
		promotions: lalopromotions,
		myaccount: lalomyaccount
	}
};

export const formatNumberToDecimal = (number) => {
	const options = {
		style: 'decimal',
		useGrouping: true,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	};

	return parseFloat(number).toLocaleString('es-AR', options);
};

export const setConfigurationFileByAccount = async (module, account) => {
	const configuration = configurations[account][module];
	if (configuration) {
		return configuration;
	} else {
		console.error('Configuración no encontrada para la cuenta', account);
		throw new Error('Configuración no encontrada');
	}
};