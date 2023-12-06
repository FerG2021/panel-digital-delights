import bunkerproducts from '../modules/products/bunker.configuration';
import bunkercategories from '../modules/categories/bunker.configuration';
import bunkerpromotions from '../modules/promotions/bunker.configuration';
import bunkermyaccount from '../modules/myaccount/bunker.configuration';

const configurations = {
	bunkerproducts: bunkerproducts,
	bunkercategories: bunkercategories,
	bunkerpromotions: bunkerpromotions,
	bunkermyaccount: bunkermyaccount
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
	const configuration = configurations[`${account}${module}`];
	if (configuration) {
		return configuration;
	} else {
		console.error('Configuración no encontrada para la cuenta', account);
		throw new Error('Configuración no encontrada');
	}
};