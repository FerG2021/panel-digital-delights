const configuration = {
	account: 'bunker',
	labels: {
		new: 'Nuevo producto',
		delete: {
			header: 'Confirmación',
			message: '¿Está seguro que desea eliminar el producto?'
		}
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
			headerName: 'Nuevo producto',
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
				modelName: 'category',
				label: 'Categoría',
				type: 'select', 
				placeholder: 'Seleccione una categoría',
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'description',
				label: 'Descripción',
				type: 'text', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'price',
				label: 'Precio',
				type: 'price', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'stock',
				label: 'Stock',
				type: 'switch', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'image',
				label: 'Imagen',
				type: 'image', 
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
			headerName: 'Modificar producto',
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
				modelName: 'category',
				label: 'Categoría',
				type: 'select', 
				placeholder: 'Seleccione una categoría',
				required: true,
				defaultValue: null,
				options: null
			},
			{
				modelName: 'description',
				label: 'Descripción',
				type: 'text', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'price',
				label: 'Precio',
				type: 'price', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'stock',
				label: 'Stock',
				type: 'switch', 
				required: true,
				defaultValue: null,
			},
			{
				modelName: 'image',
				label: 'Imagen',
				type: 'image', 
				required: true,
				defaultValue: null,
			},
		]
	}
};
  
export default configuration;