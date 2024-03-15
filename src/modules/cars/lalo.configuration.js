import * as api from '../../managers/api/carsAgencyApi';
import Store from '../../managers/store/store';

const configuration = {
	account: 'lalo',
	labels: {
		sectionTitle: 'Vehículos',
		new: 'Nuevo vehículo',
		delete: {
			header: 'Confirmación',
			message: '¿Está seguro que desea eliminar el vehículo?'
		}
	},
	endpoints: {
		getAll: api.getAllCars,
		new: api.newCar,
		update: api.updateCar,
		delete: api.deleteCar,
		sell: api.sellCar
	},
	tableColumns: [
		{
			field: 'image',
			header: 'Imagen',
			type: 'image',
			variation: ''
		},
		{
			field: 'patent',
			header: 'Patente',
			type: 'normal',
			variation: ''
		},
		{
			field: 'mark.name',
			header: 'Marca',
			type: 'normal',
			variation: ''
		},
		{
			field: 'name',
			header: 'Modelo',
			type: 'normal',
			variation: ''
		},
		{
			field: 'year',
			header: 'Año',
			type: 'normal',
			variation: ''
		},
		{
			field: 'buyer_id',
			header: '¿Vendido?',
			type: 'boolean',
			variation: ''
		},
		{
			field: 'name',
			header: 'Vender',
			type: 'button',
			variation: 'sell'
		},
		{
			field: 'name',
			header: 'Detalles',
			type: 'button',
			variation: 'detail'
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
				icon: 'directions_car',
				label: 'Nuevo vehículo'
			},
			update: {
				class: 'material-icons',
				icon: 'edit',
				label: 'Actualizar vehículo'
			},
			detail: {
				class: 'material-icons',
				icon: 'visibility',
				label: 'Detalles del vehículo'
			}
		},
		id: null,
		formConfiguration: [
			{
				modelName: 'mark',
				label: 'Marca',
				type: 'select',
				placeholder: 'Seleccione una marca',
				required: true,
				options: null,
				getOptions: () => Store.getters['MarksStore/marks'],
				default: null
			},
			{
				modelName: 'patent',
				label: 'Patente',
				type: 'text',
				required: true,
				default: null,
				placeholder: 'Ingrese la patente'
			},
			{
				modelName: 'name',
				label: 'Nombre',
				type: 'text',
				required: true,
				default: null,
				placeholder: 'Ingrese el nombre'
			},
			{
				modelName: 'category',
				label: 'Categoría',
				type: 'select',
				placeholder: 'Seleccione una categoría',
				required: true,
				options: null,
				getOptions: () => Store.getters['CategoriesStore/categories'],
				default: null
			},
			{
				modelName: 'description',
				label: 'Descripción',
				type: 'text',
				required: false,
				default: null,
				placeholder: 'Ingrese la descripción'
			},
			{
				modelName: 'year',
				label: 'Año',
				type: 'number',
				required: true,
				default: null,
				placeholder: 'Ingrese el año'
			},
			{
				modelName: 'condition',
				label: 'Condición',
				type: 'select',
				placeholder: 'Seleccione una condición',
				required: true,
				options: null,
				getOptions: () => Store.getters['CarsStore/conditionsOptions'],
				default: null
			},
			{
				modelName: 'kilometres',
				label: 'Kilómetros',
				type: 'number',
				required: true,
				default: null,
				placeholder: 'Ingrese los kilómetros'
			},
			{
				modelName: 'fuel',
				label: 'Combustible',
				type: 'select',
				placeholder: 'Seleccione un combustible',
				required: true,
				options: null,
				getOptions: () => Store.getters['CarsStore/fuelOptions'],
				default: null
			},
			{
				modelName: 'tank_space',
				label: 'Capacidad del tanque',
				type: 'number',
				required: false,
				default: null,
				placeholder: 'Ingrese la capacidad del tanque'
			},
			{
				modelName: 'trunk_space',
				label: 'Capacidad del baúl',
				type: 'number',
				required: false,
				default: null,
				placeholder: 'Ingrese la capacidad del baúl'
			},
			{
				modelName: 'weight',
				label: 'Peso',
				type: 'number',
				required: false,
				default: null,
				placeholder: 'Ingrese el peso'
			},
			{
				modelName: 'image',
				label: 'Imagen',
				type: 'image',
				required: true,
				default: null
			}
		]
	},
	sell: {
		openSellModal: false,
		selled: false,
		header: {
			class: 'material-icons',
			icon: 'sell',
			label: 'Vender vehículo'
		},
		id: null,
		formConfiguration: [
			{
				modelName: 'buyer',
				label: 'Comprador',
				type: 'select',
				placeholder: 'Seleccione el comprador',
				required: true,
				options: null,
				getOptions: () => Store.getters['ClientsStore/clients'],
				defaultValue: null
			},
			{
				field: 'buy_date',
				modelName: 'buy_date',
				label: 'Fecha de venta',
				type: 'date',
				required: true,
				variation: ''
			},
			{
				field: 'expiration_day',
				modelName: 'expiration_day',
				label: 'Día de vencimiento de cuota',
				type: 'number',
				required: true,
				variation: ''
			}
		]
	},
	selleddetails: {
		openDetailModal: false,
		header: {
			detail: {
				class: 'material-icons',
				icon: 'visibility',
				label: 'Detalles de la venta'
			}
		},
		data: null
	}
};

export default configuration;