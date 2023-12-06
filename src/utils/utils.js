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
	console.log('module');
	console.log(module);

	console.log('account');
	console.log(account);
	try {
		const configuration = await import(`../modules/${module}/${account}.configuration`);
		return configuration.default;
	} catch (error) {
		console.error('Error al importar el archivo de configuración', error);
		throw error; 
	}
};