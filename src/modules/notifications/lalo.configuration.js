import * as api from '../../managers/api/carsAgencyApi';
import Store from '../../managers/store/store';

const configuration = {
	account: 'lalo',
	labels: {
		sectionTitle: 'Notificaciones',
		new: null,
		delete: {
			header: 'Confirmación',
			message: '¿Está seguro que desea eliminar el vehículo?'
		}
	},
	endpoints: {
		getAll: api.getAllNotifications,
		read: api.readNotification
	},
	tableColumns: [
		{
			field: 'createad_at',
			header: 'Fecha de notificación',
			type: 'date',
			variation: ''
		},
		{
			field: 'name',
			header: 'Cliente',
			type: 'normal',
			variation: ''
		},
		{
			field: 'date',
			header: 'Fecha vta/cumpl.',
			type: 'date',
			variation: ''
		},
		{
			field: 'car.patent',
			header: 'Patente',
			type: 'normal',
			variation: ''
		},
		{
			field: 'label',
			properties: 'notification',
			header: 'Tipo',
			type: 'color-message',
			variation: ''
		},
		{
			field: 'read',
			header: '¿Leída?',
			properties: 'statusRead',
			type: 'color-message',
			variation: ''
		},
		{
			field: 'name',
			header: 'Enviar mensaje',
			type: 'button',
			variation: 'whatsapp'
		},
		{
			field: 'name',
			header: 'Marcar como leída',
			type: 'button',
			variation: 'reader'
		}
	],
	sendWhatsApp: {
		modalVisible: false,
		header: {
			class: 'material-icons',
			icon: 'edit',
			headerName: 'Enviar mensaje'
		},
		formConfiguration: [{
			modelName: 'message',
			label: 'Mensaje',
			type: 'text-area',
			required: true,
			defaultValue: 'Hola <CLIENT_NAME>'
		}]
	},
	create: {
		modalVisible: false,
		header: {
			class: 'material-icons',
			icon: 'edit',
			headerName: 'Nuevo vehículo'
		},
		formConfiguration: [
			{
				modelName: 'mark',
				label: 'Marca',
				type: 'select',
				placeholder: 'Seleccione una marca',
				required: true,
				defaultValue: Store.getters['MarksStore/marks']
			},
			{
				modelName: 'patent',
				label: 'Patente',
				type: 'text',
				required: true,
				defaultValue: null
			},
			{
				modelName: 'name',
				label: 'Nombre',
				type: 'text',
				required: true,
				defaultValue: null
			},
			{
				modelName: 'category',
				label: 'Categoría',
				type: 'select',
				placeholder: 'Seleccione una categoría',
				required: true,
				defaultValue: Store.getters['CategoriesStore/categories']
			},
			{
				modelName: 'description',
				label: 'Descripción',
				type: 'text',
				required: false,
				defaultValue: null
			},
			{
				modelName: 'year',
				label: 'Año',
				type: 'number',
				required: true,
				defaultValue: null
			},
			{
				modelName: 'condition',
				label: 'Condición',
				type: 'select',
				placeholder: 'Seleccione una condición',
				required: true,
				defaultValue: Store.getters['CarsStore/conditionsOptions']
			},
			{
				modelName: 'kilometres',
				label: 'Kilómetros',
				type: 'number',
				required: true,
				defaultValue: null
			},
			{
				modelName: 'fuel',
				label: 'Combustible',
				type: 'select',
				placeholder: 'Seleccione un combustible',
				required: true,
				defaultValue: Store.getters['CarsStore/fuelOptions']
			},
			{
				modelName: 'tank_space',
				label: 'Capacidad del tanque',
				type: 'number',
				required: false,
				defaultValue: null
			},
			{
				modelName: 'trunk_space',
				label: 'Capacidad del baúl',
				type: 'number',
				required: false,
				defaultValue: null
			},
			{
				modelName: 'weight',
				label: 'Peso',
				type: 'number',
				required: false,
				defaultValue: null
			},
			{
				modelName: 'image',
				label: 'Imagen',
				type: 'image',
				required: true,
				defaultValue: null
			}
		]
	}

};

export default configuration;