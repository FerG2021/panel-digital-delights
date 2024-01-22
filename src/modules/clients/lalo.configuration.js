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
		getAllClients: api.getAllClients,
		new: api.newClient,
		update: api.updateClient,
		delete: api.deleteClient
	},
	tableColumns: [
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
			headerName: 'Nuevo cliente',
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
				modelName: 'lastname',
				label: 'Apellido',
				type: 'text', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'birthday',
				label: 'Fecha de nacimiento',
				type: 'date', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'phone_number',
				label: 'Teléfono',
				type: 'number', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'address',
				label: 'Dirección',
				type: 'text', 
				required: true,
				defaultValue: null,
			}			
		]
	},
	update: {
		modalVisible: false,
		header: {
			class: 'material-icons',
			icon: 'edit',
			headerName: 'Modificar cliente',
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
				modelName: 'lastname',
				label: 'Apellido',
				type: 'text', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'birthday',
				label: 'Fecha de nacimiento',
				type: 'date', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'phone_number',
				label: 'Teléfono',
				type: 'number', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'address',
				label: 'Dirección',
				type: 'text', 
				required: true,
				defaultValue: null,
			}			
		]
	}
};

export default configuration;