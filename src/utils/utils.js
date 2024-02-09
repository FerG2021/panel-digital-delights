import moment from 'moment';

// bunker
import lalocars from '../modules/cars/lalo.configuration';
import bunkercategories from '../modules/categories/bunker.configuration';

// lalo
import lalocategories from '../modules/categories/lalo.configuration';
import laloclients from '../modules/clients/lalo.configuration';
import lalomarks from '../modules/marks/lalo.configuration';
import bunkermyaccount from '../modules/myaccount/bunker.configuration';
import lalomyaccount from '../modules/myaccount/lalo.configuration';
import bunkerproducts from '../modules/products/bunker.configuration';
import bunkerpromotions from '../modules/promotions/bunker.configuration';

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

export const setFormConfiguration = (Configuration, data) => {
	Configuration.update.id = data.id;

	for (const configuration of Configuration.update.formConfiguration) {
		configuration.defaultValue = data[configuration.modelName];
	}

	Configuration.update.modalVisible = true;

	return Configuration;
};