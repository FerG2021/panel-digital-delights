const configuration = {
	account: 'chinis',
	formConfiguration: [
		{
			modelName: 'name',
			label: 'Nombre',
			type: 'text', 
			required: true,
			defaultValue: null,
			setDefaultValue: true,
		},
		{
			modelName: 'lastname',
			label: 'Apellido',
			type: 'text', 
			required: true,
			defaultValue: null,
			setDefaultValue: true,
		},
		{
			modelName: 'password',
			label: 'Contraseña',
			type: 'password', 
			required: true,
			defaultValue: null,
			setDefaultValue: false,
		},
		{
			modelName: 'cpassword',
			label: 'Confirmar contraseña',
			type: 'password', 
			required: true,
			defaultValue: null,
			setDefaultValue: false,
		},
	]
};

export default configuration;