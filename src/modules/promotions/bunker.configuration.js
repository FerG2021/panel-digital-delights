import * as api from '../../managers/api/api';

const configuration = {
	account: 'bunker',
	labels: {
		sectionTitle: 'Promociones',
		new: 'Nueva promoción',
		delete: {
			header: 'Confirmación',
			message: '¿Está seguro que desea eliminar la promoción?'
		}
	},
	endpoints: {
		getAllPromotions: api.getAllPromotions,
		new: api.newPromotion,
		update: api.updatePromotion,
		delete: api.deletePromotion
	},
	tableColumns: [
		{ 
			field: 'image', 
			header: 'Imagen', 
			type: 'image', 
			variation: '' 
		},
		{ 
			field: 'title', 
			header: 'Títilo', 
			type: 'normal', 
			variation: '' 
		},
		{ 
			field: 'description', 
			header: 'Descripción', 
			type: 'normal', 
			variation: '' 
		},
		{ 
			field: 'price', 
			header: 'Precio', 
			type: 'price', 
			variation: '' 
		},
		{ 
			field: 'available', 
			header: 'Disponible', 
			type: 'boolean', 
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
			headerName: 'Nueva promoción',
		},
		formConfiguration: [
			{
				modelName: 'title',
				label: 'Título',
				type: 'text', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'description',
				label: 'Descripción',
				type: 'text', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'price',
				label: 'Precio',
				type: 'price', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'available',
				label: 'Disponible',
				type: 'switch', 
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
			headerName: 'Modificar promoción',
		},
		id: null,
		formConfiguration: [
			{
				modelName: 'title',
				label: 'Título',
				type: 'text', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'description',
				label: 'Descripción',
				type: 'text', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'price',
				label: 'Precio',
				type: 'price', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'available',
				label: 'Disponible',
				type: 'switch', 
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
	}
};
  
export default configuration;