import * as api from '../../managers/api/digitalDelightsApi';

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
		getAll: api.getAllPromotions,
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
		}
	],
	actions: {
		openCreateModal: false,
		openUpdateModal: false,
		openDetailModal: false,
		header: {
			new: {
				class: 'material-icons',
				icon: 'inventory_2',
				label: 'Nueva promoción'
			},
			update: {
				class: 'material-icons',
				icon: 'edit',
				label: 'Actualizar promoción'
			},
			detail: {
				class: 'material-icons',
				icon: 'visibility',
				label: 'Detalles de la promoción'
			}
		},
		id: null,
		formConfiguration: [
			{
				modelName: 'title',
				label: 'Título',
				type: 'text',
				required: true,
				default: null,
				placeholder: 'Ingrese el nombre'
			},
			{
				modelName: 'description',
				label: 'Descripción',
				type: 'text',
				required: true,
				default: null,
				placeholder: 'Ingrese la descripción'
			},
			{
				modelName: 'price',
				label: 'Precio',
				type: 'price',
				required: true,
				default: null,
				placeholder: 'Ingrese el precio'
			},
			{
				modelName: 'available',
				label: 'Disponible',
				type: 'switch',
				required: true,
				default: null
			},
			{
				modelName: 'image',
				label: 'Imagen',
				type: 'image',
				required: true,
				default: null
			}
		]
	}
	// create: {
	// 	modalVisible: false,
	// 	header: {
	// 		class: 'material-icons',
	// 		icon: 'edit',
	// 		headerName: 'Nueva promoción'
	// 	},
	// 	formConfiguration: [
	// 		{
	// 			modelName: 'title',
	// 			label: 'Título',
	// 			type: 'text',
	// 			required: true,
	// 			defaultValue: null
	// 		},
	// 		{
	// 			modelName: 'description',
	// 			label: 'Descripción',
	// 			type: 'text',
	// 			required: true,
	// 			defaultValue: null
	// 		},
	// 		{
	// 			modelName: 'price',
	// 			label: 'Precio',
	// 			type: 'price',
	// 			required: true,
	// 			defaultValue: null
	// 		},
	// 		{
	// 			modelName: 'available',
	// 			label: 'Disponible',
	// 			type: 'switch',
	// 			required: true,
	// 			defaultValue: null
	// 		},
	// 		{
	// 			modelName: 'image',
	// 			label: 'Imagen',
	// 			type: 'image',
	// 			required: true,
	// 			defaultValue: null
	// 		}
	// 	]
	// },

	// update: {
	// 	modalVisible: false,
	// 	header: {
	// 		class: 'material-icons',
	// 		icon: 'edit',
	// 		headerName: 'Modificar promoción'
	// 	},
	// 	id: null,
	// 	formConfiguration: [
	// 		{
	// 			modelName: 'title',
	// 			label: 'Título',
	// 			type: 'text',
	// 			required: true,
	// 			defaultValue: null
	// 		},
	// 		{
	// 			modelName: 'description',
	// 			label: 'Descripción',
	// 			type: 'text',
	// 			required: true,
	// 			defaultValue: null
	// 		},
	// 		{
	// 			modelName: 'price',
	// 			label: 'Precio',
	// 			type: 'price',
	// 			required: true,
	// 			defaultValue: null
	// 		},
	// 		{
	// 			modelName: 'available',
	// 			label: 'Disponible',
	// 			type: 'switch',
	// 			required: true,
	// 			defaultValue: null
	// 		},
	// 		{
	// 			modelName: 'image',
	// 			label: 'Imagen',
	// 			type: 'image',
	// 			required: true,
	// 			defaultValue: null
	// 		}
	// 	]
	// }
};

export default configuration;