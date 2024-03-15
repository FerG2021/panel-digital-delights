import * as api from '../../managers/api/carsAgencyApi';

const configuration = {
	account: 'lalo',
	labels: {
		sectionTitle: 'Cuotas mensuales vencidas',
		new: null,
		collectFee: {
			header: 'Confirmación',
			message: '¿Está seguro que desea cobrar la cuota?'
		}
	},
	endpoints: {
		getAll: api.getAllMonthlyFees,
		collectFee: api.collectFee
	},
	tableColumns: [
		{
			field: 'patent',
			header: 'Patente',
			type: 'normal',
			variation: ''
		},
		{
			field: 'client.fullname',
			header: 'Cliente',
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
			field: 'expiration_day',
			header: 'Día de vencimiento',
			type: 'normal',
			variation: ''
		},
		{
			field: 'monthly_fee_paid',
			header: '¿Cuota pagada?',
			type: 'boolean',
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
			header: 'Cobrar cuota',
			type: 'button',
			variation: 'collect-fee'
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
			defaultValue: 'Hola <CLIENT_NAME>.'
		}]
	}
};

export default configuration;