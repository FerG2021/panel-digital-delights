import * as api from '../../managers/api/carAgencyApi';

const configuration = {
	account: 'lalo',
	labels: {
		sectionTitle: 'Marcas',
		new: 'Nueva marca',
		delete: {
			header: 'Confirmación',
			message: '¿Está seguro que desea eliminar la marca?'
		}
	},
	methods: {
		getAll: api.getAllCategories,
		add: api.newCategory,
		update: api.updateCategory,
		delete: api.deleteCategory
	},
	tableColumns: [
		{ 
			field: 'image', 
			header: 'Imagen', 
			type: 'image', 
			variation: '' 
		},
		{ 
			field: 'name', 
			header: 'Nombre', 
			type: 'normal', 
			variation: '' 
		},
		{ 
			field: 'name', 
			header: 'Editar', 
			type: 'button', 
			variation: 'update' 
		},
		{ 
			field: 'name', 
			header: 'Eliminar', 
			type: 'button', 
			variation: 'delete' 
		},
	],
	create: {
		modalVisible: false,
		header: {
			class: 'material-icons',
			icon: 'edit',
			headerName: 'Nueva marca',
		},
		formConfiguration: [
			{
				modelName: 'name',
				label: 'Nombre',
				type: 'text', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'image',
				label: 'Imagen',
				type: 'image', 
				required: true,
				defaultValue: null,
			},
		]
	},
	update: {
		modalVisible: false,
		header: {
			class: 'material-icons',
			icon: 'edit',
			headerName: 'Modificar marca',
		},
		id: null,
		formConfiguration: [
			{
				modelName: 'name',
				label: 'Nombre',
				type: 'text', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'image',
				label: 'Imagen',
				type: 'image', 
				required: true,
				defaultValue: null,
			}
		]
	}
};

export default configuration;