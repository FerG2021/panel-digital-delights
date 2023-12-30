import * as api from '../../managers/api/api';

const configuration = {
	account: 'bunker',
	labels: {
		sectionTitle: 'Categorías',
		new: 'Nueva categoría',
		delete: {
			header: 'Confirmación',
			message: '¿Está seguro que desea eliminar la categoría?'
		}
	},
	endpoints: {
		getAllCategories: api.getAllCategories,
		new: api.newCategory,
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
			headerName: 'Nueva categoría',
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
			headerName: 'Modificar categoría',
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