import * as api from '../../managers/api/digitalDelightsApi';
import Store from '../../managers/store/store';

const configuration = {
	account: 'bunker',
	labels: {
		sectionTitle: 'Productos',
		new: 'Nuevo producto',
		delete: {
			header: 'Confirmación',
			message: '¿Está seguro que desea eliminar el producto?'
		}
	},
	endpoints: {
		getAll: api.getAllProducts,
		new: api.newProduct,
		update: api.updateProduct,
		delete: api.deleteProduct
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
			field: 'description',
			header: 'Descripción',
			type: 'normal',
			variation: ''
		},
		{
			field: 'category.name',
			header: 'Categoría',
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
			field: 'stock',
			header: 'Stock',
			type: 'boolean',
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

	actions: {
		openCreateModal: false,
		openUpdateModal: false,
		openDetailModal: false,
		header: {
			new: {
				class: 'material-icons',
				icon: 'inventory_2',
				label: 'Nuevo producto'
			},
			update: {
				class: 'material-icons',
				icon: 'edit',
				label: 'Actualizar producto'
			},
			detail: {
				class: 'material-icons',
				icon: 'visibility',
				label: 'Detalles del producto'
			}
		},
		id: null,
		formConfiguration: [
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
				modelName: 'stock',
				label: 'Stock',
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
};

export default configuration;