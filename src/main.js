import ElementPlus from 'element-plus';
import ElMessage from 'element-plus';
import locale from 'element-plus/lib/locale/lang/es';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import CascadeSelect from 'primevue/cascadeselect';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; //optional for column grouping
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import DialogService from 'primevue/dialogservice';
import DynamicDialog from 'primevue/dynamicdialog';
import Galleria from 'primevue/galleria';
import Toast from 'primevue/toast';
import { createApp } from 'vue';
// Elment plus
import 'element-plus/dist/index.css';

// i18n
import VueAxios from 'vue-axios';

import App from './App.vue';
import { i18n } from './plugins/i18n';

//
// PRIMEVUE
//

// PrimeVue

// PrimeVue Components
import 'primevue/resources/themes/saga-blue/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

import ToastService from 'primevue/toastservice';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Row from 'primevue/row'; //optional for row
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import ProgressSpinner from 'primevue/progressspinner';
import FileUpload from 'primevue/fileupload';
import TreeSelect from 'primevue/treeselect';
import Rating from 'primevue/rating';
import Textarea from 'primevue/textarea';
import Image from 'primevue/image';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import 'primeflex/primeflex.css';

// Scroll
import VirtualScroller from 'primevue/virtualscroller';
import ToggleButton from 'primevue/togglebutton';
import InlineMessage from 'primevue/inlinemessage';

//
// FIN PRIME VUE
//

// importamos las rutas
import router from './managers/router/Router.js';

// vuex
// import { createStore } from 'vuex';
import store from './managers/store/store';

import axios from 'axios';

// usado para login
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// import loadModulesByAccount from './utils/modulesLoader';
// const account = 'admin';
// loadModulesByAccount(store, router, account);

createApp(App)
	.component('Button', Button)
	.component('InputText', InputText)
	.component('Password', Password)
	.component('Toast', Toast)
	.component('ConfirmDialog', ConfirmDialog)
	.component('DynamicDialog', DynamicDialog)
	.component('Dialog', Dialog)
	.component('DataTable', DataTable)
	.component('Column', Column)
	.component('ColumnGroup', ColumnGroup)
	.component('Row', Row)
	.component('Dropdown', Dropdown)
	.component('InputNumber', InputNumber)
	.component('InputSwitch', InputSwitch)
	.component('Tag', Tag)
	.component('Card', Card)
	.component('ProgressSpinner', ProgressSpinner)
	.component('FileUpload', FileUpload)
	.component('CascadeSelect', CascadeSelect)
	.component('TreeSelect', TreeSelect)
	.component('Rating', Rating)
	.component('Textarea', Textarea)
	.component('Image', Image)
	.component('VirtualScroller', VirtualScroller)
	.component('ToggleButton', ToggleButton)
	.component('InlineMessage', InlineMessage)
	.component('Calendar', Calendar)
	.component('Badge', Badge)
	.component('Galleria', Galleria)
	.directive('badge', BadgeDirective)
	.use(router)
	.use(ElementPlus, { locale })
	.use(ElMessage)
	.use(i18n)
	.use(VueAxios, axios)
	.use(store)
	.use(PrimeVue, {
		locale: {
			startsWith: 'Starts with',
			contains: 'Contains',
			notContains: 'Not contains',
			endsWith: 'Ends with',
			equals: 'Equals',
			notEquals: 'Not equals',
			noFilter: 'No Filter',
			lt: 'Less than',
			lte: 'Less than or equal to',
			gt: 'Greater than',
			gte: 'Greater than or equal to',
			dateIs: 'Date is',
			dateIsNot: 'Date is not',
			dateBefore: 'Date is before',
			dateAfter: 'Date is after',
			clear: 'Clear',
			apply: 'Apply',
			matchAll: 'Match All',
			matchAny: 'Match Any',
			addRule: 'Add Rule',
			removeRule: 'Remove Rule',
			accept: 'Aceptar',
			reject: 'Cancelar',
			choose: 'Seleccionar',
			upload: 'Upload',
			cancel: 'Cancelar',
			completed: 'Completed',
			pending: 'Pending',
			dayNames: [
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday'
			],
			dayNamesShort: [
				'Sun',
				'Mon',
				'Tue',
				'Wed',
				'Thu',
				'Fri',
				'Sat'
			],
			dayNamesMin: [
				'Su',
				'Mo',
				'Tu',
				'We',
				'Th',
				'Fr',
				'Sa'
			],
			monthNames: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			],
			monthNamesShort: [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec'
			],
			chooseYear: 'Choose Year',
			chooseMonth: 'Choose Month',
			chooseDate: 'Choose Date',
			prevDecade: 'Previous Decade',
			nextDecade: 'Next Decade',
			prevYear: 'Previous Year',
			nextYear: 'Next Year',
			prevMonth: 'Previous Month',
			nextMonth: 'Next Month',
			prevHour: 'Previous Hour',
			nextHour: 'Next Hour',
			prevMinute: 'Previous Minute',
			nextMinute: 'Next Minute',
			prevSecond: 'Previous Second',
			nextSecond: 'Next Second',
			am: 'am',
			pm: 'pm',
			today: 'Today',
			weekHeader: 'Wk',
			firstDayOfWeek: 0,
			dateFormat: 'mm/dd/yy',
			weak: 'Débil',
			medium: 'Media',
			strong: 'Fuerte',
			passwordPrompt: 'Ingresá tu contraseña',
			emptyFilterMessage: 'No se encontraron resultados', // @deprecated Use 'emptySearchMessage' option instead.
			searchMessage: '{0} results are available',
			selectionMessage: '{0} items selected',
			emptySelectionMessage: 'No selected item',
			emptySearchMessage: 'No results found',
			emptyMessage: 'No available options',
			aria: {
				trueLabel: 'True',
				falseLabel: 'False',
				nullLabel: 'Not Selected',
				star: '1 star',
				stars: '{star} stars',
				selectAll: 'All items selected',
				unselectAll: 'All items unselected',
				close: 'Close',
				previous: 'Previous',
				next: 'Next',
				navigation: 'Navigation',
				scrollTop: 'Scroll Top',
				moveTop: 'Move Top',
				moveUp: 'Move Up',
				moveDown: 'Move Down',
				moveBottom: 'Move Bottom',
				moveToTarget: 'Move to Target',
				moveToSource: 'Move to Source',
				moveAllToTarget: 'Move All to Target',
				moveAllToSource: 'Move All to Source',
				pageLabel: '{page}',
				firstPageLabel: 'First Page',
				lastPageLabel: 'Last Page',
				nextPageLabel: 'Next Page',
				prevPageLabel: 'Previous Page',
				rowsPerPageLabel: 'Rows per page',
				jumpToPageDropdownLabel: 'Jump to Page Dropdown',
				jumpToPageInputLabel: 'Jump to Page Input',
				selectRow: 'Row Selected',
				unselectRow: 'Row Unselected',
				expandRow: 'Row Expanded',
				collapseRow: 'Row Collapsed',
				showFilterMenu: 'Show Filter Menu',
				hideFilterMenu: 'Hide Filter Menu',
				filterOperator: 'Filter Operator',
				filterConstraint: 'Filter Constraint',
				editRow: 'Row Edit',
				saveEdit: 'Save Edit',
				cancelEdit: 'Cancel Edit',
				listView: 'List View',
				gridView: 'Grid View',
				slide: 'Slide',
				slideNumber: '{slideNumber}',
				zoomImage: 'Zoom Image',
				zoomIn: 'Zoom In',
				zoomOut: 'Zoom Out',
				rotateRight: 'Rotate Right',
				rotateLeft: 'Rotate Left'
			}
		}
	})
	.use(ToastService)
	.use(ConfirmationService)
	.use(DialogService)
	.mount('#app');
