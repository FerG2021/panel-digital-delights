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
		getAllCars: api.getAllCars,
		new: api.newCar,
		update: api.updateCar,
		delete: api.deleteCar,
		sellCar: api.sellCar
	},
	tableColumns: [
		{
			field: 'type',
			header: 'Tipo',
			type: 'normal',
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
			header: 'Fecha',
			type: 'normal',
			variation: ''
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
	},
	update: {
		modalVisible: false,
		header: {
			class: 'material-icons',
			icon: 'edit',
			headerName: 'Modificar vehículo'
		},
		id: null,
		formConfiguration: [
			{
				modelName: 'mark',
				label: 'Marca',
				type: 'select',
				placeholder: 'Seleccione una marca',
				required: true,
				defaultValue: null,
				options: Store.getters['MarksStore/marks']
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
				defaultValue: null,
				options: Store.getters['CategoriesStore/categories']
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
				defaultValue: null,
				options: Store.getters['CarsStore/conditionsOptions']
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
				defaultValue: null,
				options: Store.getters['CarsStore/fuelOptions']
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
	},
	detail: {
		modalVisible: false,
		header: {
			class: 'material-icons',
			icon: 'info',
			headerName: 'Detalles del vehículo'
		},
		id: null,
		formConfiguration: [
			{
				modelName: 'mark',
				label: 'Marca',
				type: 'select',
				placeholder: 'Seleccione una marca',
				required: true,
				defaultValue: null,
				options: Store.getters['MarksStore/marks']
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
				defaultValue: null,
				options: Store.getters['CategoriesStore/categories']
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
				defaultValue: null,
				options: Store.getters['CarsStore/conditionsOptions']
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
				defaultValue: null,
				options: Store.getters['CarsStore/fuelOptions']
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
	},
	sell: {
		modalVisible: false,
		selled: false,
		header: {
			class: 'material-icons',
			icon: 'edit',
			headerName: 'Vender vehículo'
		},
		id: null,
		formConfiguration: [{
			modelName: 'buyer',
			label: 'Comprador',
			type: 'select',
			placeholder: 'Seleccione el comprador',
			required: true,
			defaultValue: null
		},
		{
			field: 'buy_date',
			modelName: 'buy_date',
			label: 'Fecha de venta',
			type: 'date',
			variation: ''
		}]
	},
	selleddetails: {
		modalVisible: false,
		header: {
			class: 'material-icons',
			icon: 'info',
			headerName: 'Detalles de la venta'
		},
		data: null
	}
};

export default configuration;