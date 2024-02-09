const configuration = {
	account: 'bunker',
	formConfiguration: [
		{
			modelName: 'name',
			label: 'Nombre',
			type: 'text',
			required: true,
			defaultValue: null,
			setDefaultValue: true
		},
		{
			modelName: 'lastname',
			label: 'Apellido',
			type: 'text',
			required: true,
			defaultValue: null,
			setDefaultValue: true
		},
		{
			modelName: 'password',
			label: 'Contraseña',
			type: 'password',
			defaultValue: null,
			setDefaultValue: false
		},
		{
			modelName: 'cpassword',
			label: 'Confirmar contraseña',
			type: 'password',
			defaultValue: null,
			setDefaultValue: false
		}
	]
};

export default configuration;