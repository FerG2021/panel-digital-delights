import * as api from '../../managers/api/carsAgencyApi';

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
	endpoints: {
		getAll: api.getAllMarks,
		new: api.newMark,
		update: api.updateMark,
		delete: api.deleteMark
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
		}
	],
	actions: {
		openCreateModal: false,
		openUpdateModal: false,
		header: {
			new: {
				class: 'material-icons',
				icon: 'sell',
				label: 'Nueva marca'
			},
			update: {
				class: 'material-icons',
				icon: 'edit',
				label: 'Actualizar marca'
			}
		},
		id: null,
		formConfiguration: [{
			modelName: 'name',
			label: 'Nombre',
			type: 'text',
			required: true,
			default: null,
			placeholder: 'Ingrese la marca'
		},
		{
			modelName: 'image',
			label: 'Imagen',
			type: 'image',
			required: true,
			default: null
		}]
	}
};

export default configuration;