export default {
	namespaced: true,

	state: {
		cars: null,
		fuels: [],
		conditions: [],
		fuelOptions: [
			{
				id: 'naphtha',
				name: 'Nafta'
			},
			{
				id: 'gasoil',
				name: 'Gasoil'
			},
			{
				id: 'gnc',
				name: 'GNC'
			}
		],
		conditionsOptions: [
			{
				id: 'new',
				name: 'Nuevo'
			},
			{
				id: 'used',
				name:'Usado'
			}
		]
	},

	getters: {
		cars(state) {
			return state.cars;
		},
		fuelOptions(state) {
			return state.fuelOptions;
		},
		conditionsOptions(state) {
			return state.conditionsOptions;
		},
		fuels(state) {
			return state.fuels;
		},
		conditions(state) {
			return state.conditions;
		}
	},

	mutations: {
		setCars(state, cars) {
			state.cars = cars;
		},
		clearStore(state) {
			state.cars = null;
		},
		setFuels(state, fuels) {
			state.fuels = fuels;
		},
		setConditions(state, conditions) {
			state.conditions = conditions;
		}
	},

	actions: { },
};