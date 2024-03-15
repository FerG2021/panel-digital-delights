import * as api from '../../managers/api/carsAgencyApi';

const configuration = {
	account: 'lalo',
	labels: {
		sectionTitle: 'Categorías',
		new: 'Nueva categoría',
		delete: {
			header: 'Confirmación',
			message: '¿Está seguro que desea eliminar la categoría?'
		}
	},
	endpoints: {
		getAll: api.getAllCategories,
		new: api.newCategory,
		update: api.updateCategory,
		delete: api.deleteCategory
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
		}
	],
	actions: {
		openCreateModal: false,
		openUpdateModal: false,
		openDetailModal: false,
		header: {
			new: {
				class: 'material-icons',
				icon: 'category',
				label: 'Nueva categoría'
			},
			update: {
				class: 'material-icons',
				icon: 'edit',
				label: 'Actualizar categoría'
			},
			detail: {
				class: 'material-icons',
				icon: 'visibility',
				label: 'Detalles de la categoría'
			}
		},
		id: null,
		formConfiguration: [{
			modelName: 'name',
			label: 'Nombre',
			type: 'text',
			required: true,
			default: null,
			placeholder: 'Ingrese la categoría'
		}]
	}
};

export default configuration;