import moment from 'moment';

// bunker
import bunkerproducts from '../modules/products/bunker.configuration';
import bunkercategories from '../modules/categories/bunker.configuration';
import bunkerpromotions from '../modules/promotions/bunker.configuration';
import bunkermyaccount from '../modules/myaccount/bunker.configuration';

// lalo
import lalocategories from '../modules/categories/lalo.configuration';
import lalomarks from '../modules/marks/lalo.configuration';
import laloclients from '../modules/clients/lalo.configuration';
import lalocars from '../modules/cars/lalo.configuration';
import lalomyaccount from '../modules/myaccount/lalo.configuration';

const configurations = {
	bunkerproducts: bunkerproducts,
	bunkercategories: bunkercategories,
	bunkerpromotions: bunkerpromotions,
	bunkermyaccount: bunkermyaccount,
	
	lalocategories: lalocategories,
	lalomarks: lalomarks,
	laloclients: laloclients,
	lalocars: lalocars,
	lalomyaccount: lalomyaccount
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


export const formatDate = (date, format) => {
	return moment(date).format(format);
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