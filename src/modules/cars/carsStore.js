export default {
	namespaced: true,

	state: {
		cars: null,
		fuels: [],
		conditions: [],
		fuelOptions: [
			{
				id: 1,
				name: 'Nafta'
			},
			{
				id: 2,
				name: 'Gasoil'
			},
			{
				id: '3',
				name: 'GNC'
			}
		],
		conditionsOptions: [
			{
				id: 1,
				name: 'Nuevo'
			},
			{
				id: 2,
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