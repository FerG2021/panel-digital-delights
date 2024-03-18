import moment from 'moment';

import lalocars from '../modules/cars/lalo.configuration';
import bunkercategories from '../modules/categories/bunker.configuration';
import lalocategories from '../modules/categories/lalo.configuration';
import laloclients from '../modules/clients/lalo.configuration';
import lalomarks from '../modules/marks/lalo.configuration';
import lalomonthlyfees from '../modules/monthlyfees/lalo.configuration';
import bunkermyaccount from '../modules/myaccount/bunker.configuration';
import lalomyaccount from '../modules/myaccount/lalo.configuration';
import lalonotifications from '../modules/notifications/lalo.configuration';
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
	lalomyaccount: lalomyaccount,
	lalonotifications: lalonotifications,
	lalomonthlyfees: lalomonthlyfees
};

export const formatNumberToDecimal = (number, min = 2, max = 2) => {
	const options = {
		style: 'decimal',
		useGrouping: true,
		minimumFractionDigits: min,
		maximumFractionDigits: max
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
	Configuration = setOptionsForAnyFormConfiguration(Configuration);
	Configuration = setOptionsForActionsFormConfiguration(Configuration);

	if (data) {
		Configuration.actions.id = data.id;

		for (const configuration of Configuration.actions.formConfiguration) {
			configuration.default = data[configuration.modelName];
		}
	}

	return Configuration;
};

function setOptionsForAnyFormConfiguration(Configuration) {
	for (const key in Configuration) {
		if (typeof Configuration[key] === 'object') {
			if (Configuration[key].formConfiguration) {
				for (const configuration of Configuration[key].formConfiguration) {
					if (configuration.type === 'select') {
						configuration.options = configuration.getOptions();
					}
				}
			}
		}
	}

	return Configuration;
}

function setOptionsForActionsFormConfiguration(Configuration) {
	for (const configuration of Configuration.actions.formConfiguration) {
		if (configuration.type === 'select') {
			configuration.options = configuration.getOptions();
		}
	}

	return Configuration;
}

export const getArrayDetailData = (formConfiguration) => {
	let detailsData = [];

	for (const item of formConfiguration) {
		let object = {};
		object.label = item.label;
		object.type = item.type;
		object.variant = item.modelName;

		if (item.type === 'select') {
			object.value = item.default?.name;
		}

		if (item.type === 'text' || item.type === 'number' || item.type === 'image' || item.type === 'image-multiple') {
			object.value = item.default;
		}

		detailsData.push(object);
	}

	return detailsData;
};