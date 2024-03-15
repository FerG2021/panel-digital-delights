import * as api from '../../managers/api/carsAgencyApi';

const configuration = {
	account: 'lalo',
	labels: {
		sectionTitle: 'Clientes',
		new: 'Nuevo cliente',
		delete: {
			header: 'Confirmación',
			message: '¿Está seguro que desea eliminar el cliente?'
		}
	},
	endpoints: {
		getAll: api.getAllClients,
		new: api.newClient,
		update: api.updateClient,
		delete: api.deleteClient
	},
	filters: [
		'name',
		'lastname',
		'birthday',
		'address',
		'recordsCars'
	],
	tableColumns: [
		{
			field: 'dni',
			header: 'DNI',
			type: 'normal',
			variation: ''
		},
		{
			field: 'lastname',
			header: 'Apellido',
			type: 'normal',
			variation: ''
		},
		{
			field: 'name',
			header: 'Nombre',
			type: 'normal',
			variation: ''
		},
		{
			field: 'birthday',
			header: 'Fecha de nacimiento',
			type: 'date',
			variation: ''
		},
		{
			field: 'address',
			header: 'Dirección',
			type: 'normal',
			variation: ''
		},
		{
			field: 'carsPatent',
			header: 'Vehículos',
			type: 'array',
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
		header: {
			new: {
				class: 'material-icons',
				icon: 'person',
				label: 'Nuevo cliente'
			},
			update: {
				class: 'material-icons',
				icon: 'edit',
				label: 'Actualizar cliente'
			}
		},
		id: null,
		formConfiguration: [
			{
				modelName: 'dni',
				label: 'DNI',
				type: 'number',
				required: true,
				default: null,
				placeholder: 'Ingrese el DNI'
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
				modelName: 'lastname',
				label: 'Apellido',
				type: 'text',
				required: true,
				default: null,
				placeholder: 'Ingrese el apellido'
			},
			{
				modelName: 'birthday',
				label: 'Fecha de nacimiento',
				type: 'date',
				required: true,
				default: null,
				placeholder: 'Ingrese la fecha de nacimiento'
			},
			{
				modelName: 'phone_number',
				label: 'Teléfono',
				type: 'number',
				required: true,
				default: null,
				placeholder: 'Ingrese el número de teléfono'
			},
			{
				modelName: 'address',
				label: 'Dirección',
				type: 'text',
				required: true,
				default: null,
				placeholder: 'Ingrese la direccion'
			}
		]
	}
};

export default configuration;