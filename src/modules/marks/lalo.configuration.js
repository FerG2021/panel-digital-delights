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
		getAllMarks: api.getAllMarks,
		new: api.newMark,
		update: api.updateMark,
		delete: api.deleteMark
	},
	tableColumns: [
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
			}
		]
	}
};

export default configuration;