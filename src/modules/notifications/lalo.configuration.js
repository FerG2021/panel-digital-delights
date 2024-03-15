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
		openSendWhatsAppModal: false,
		header: {
			class: 'material-icons',
			icon: 'send',
			label: 'Enviar mensaje'
		},
		formConfiguration: [{
			modelName: 'message',
			label: 'Mensaje',
			type: 'text-area',
			required: true,
			defaultValue: 'Hola <CLIENT_NAME>'
		}]
	}
};

export default configuration;