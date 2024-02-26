<script>
import { FilterMatchMode } from 'primevue/api';

import { formatDate, formatNumberToDecimal } from '../../utils/utils';

export default {
	name: 'TableComponent',
	props: {
		elements: {
			type: Array,
			required: true
		},
		labels: {
			type: Object,
			required: true
		},
		columns: {
			type: Array,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		filtersColumn: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			filters: {
				global: {
					value: null,
					matchMode: FilterMatchMode.CONTAINS
				}
			}
		};
	},
	methods: {
		getHeightWindow() {
			var heightWindow = window.innerHeight - 260;

			return heightWindow + 'px';
		},

		async deleteRow(element) {
			this.$confirm.require({
				header: this.labels.delete.header,
				message: this.labels.delete.message,
				icon: 'pi pi-info-circle',
				acceptClass: 'p-button-danger',
				acceptIcon: 'pi pi-check',
				rejectIcon: 'pi pi-times',
				accept: () => {
					this.$emit('delete', element);
				},
				reject: () => {	},
				onHide: () => {	}
			});
		},
		formatNumber(number) {
			return formatNumberToDecimal(number);
		},
		formatDate(date) {
			return formatDate(date, 'DD/MM/YYYY');
		},
		isColumn(column, type) {
			return column === type;
		},
		existBuyer(data) {
			return data === null;
		},
		showSuccessMessage(slotProps, column) {
			return slotProps.data[column.field] === 1 || slotProps.data[column.field] === true || slotProps.data[column.field] !== null;
		},
		formatArrayToString(patentsArray) {
			return patentsArray.length > 0 ? patentsArray.join(', ') : '-';
		}
	}
};
</script>

<template>
	<div>
		<DataTable
			:value="elements"
			responsiveLayout="scroll"
			:loading="loading"
			:globalFilterFields="filtersColumn"
			v-model:filters="filters"
			filterDisplay="menu"
			headerStyle="text-align: center"
			:scrollHeight="getHeightWindow()"
			class="data-table"
			v-model:selection="selectedCustomers"
		>
			<template #header>
				<div class="header-container">
					<div class="search-container">
						<span class="p-input-icon-left">
							<i class="pi pi-search" />
							<InputText
								v-model="filters['global'].value"
								:placeholder="$t('productsSection.placeholderSearch')"
							/>
						</span>
					</div>
					<div class="btn-container">
						<Button
							v-if="labels.new !== null"
							:label="labels.new"
							@click="$emit('add')"
						/>
					</div>
				</div>
			</template>

			<template v-for="column in columns">
				<Column
					:key="column.field"
					:field="column.field"
					:header="column.header"
					v-if="isColumn(column.type, 'normal')"
				/>

				<Column
					:key="column.field"
					:field="column.field"
					:header="column.header"
					v-if="isColumn(column.type, 'array')"
				>
					<template #body="slotProps">
						{{  formatArrayToString(slotProps.data[column.field]) }}
					</template>
				</Column>

				<Column
					:key="column.field"
					:field="column.field"
					:header="column.header"
					v-if="isColumn(column.type, 'price')"
				>
					<template #body="slotProps">
						{{  `$${formatNumber(slotProps.data[column.field]) }` }}
					</template>
				</Column>

				<Column
					:key="column.field"
					:field="column.field"
					:header="column.header"
					v-if="isColumn(column.type, 'date')"
				>
					<template #body="slotProps">
						{{  `${formatDate(slotProps.data[column.field]) }` }}
					</template>
				</Column>

				<Column
					:key="column.field"
					:field="column.field"
					:header="column.header"
					v-if="isColumn(column.type, 'boolean')"
				>
					<template #body="slotProps">
						<InlineMessage
							severity="success"
							v-if="showSuccessMessage(slotProps, column)"
						>
							{{ $t('yes') }}
						</InlineMessage>

						<InlineMessage
							severity="error"
							v-if="slotProps.data[column.field] === 0 || slotProps.data[column.field] === false | slotProps.data[column.field] === null"
						>
							{{ $t('no') }}
						</InlineMessage>
					</template>
				</Column>

				<Column
					:key="column.field"
					:header="column.header"
					v-if="isColumn(column.type, 'color-message')"
				>
					<template #body="slotProps">
						<Tag
							:icon="slotProps.data[column.properties].icon"
							:value="slotProps.data[column.properties].label"
							:severity="slotProps.data[column.properties].type"
						/>
					</template>
				</Column>

				<Column
					:key="column.field"
					:field="column.field"
					:header="column.header"
					v-else-if="isColumn(column.type, 'button')"
					style="width: 20px"
				>
					<template #body="slotProps">
						<div style="display: flex">
							<div style="margin: auto">
								<Button
									v-if="isColumn(column.variation, 'update')"
									icon="pi pi-pencil"
									class="p-button-rounded p-button-warning mr-2"
									@click="$emit('edit', slotProps.data)"
								/>
								<Button
									v-else-if="isColumn(column.variation, 'detail')"
									icon="pi pi-eye"
									class="p-button-rounded p-button-primary mr-2"
									@click="$emit('detail', slotProps.data)"
								/>
								<Button
									v-else-if="isColumn(column.variation, 'delete')"
									icon="pi pi-trash"
									class="p-button-rounded p-button-danger"
									@click="deleteRow(slotProps.data)"
								/>
								<Button
									v-else-if="isColumn(column.variation, 'sell') && existBuyer(slotProps.data.buyer_id)"
									icon="pi pi-ticket"
									class="p-button-rounded p-button-primary mr-2"
									@click="$emit('sell', slotProps.data)"
								/>
								<Button
									v-else-if="isColumn(column.variation, 'sell') && !existBuyer(slotProps.data.buyer_id)"
									icon="pi pi-eye"
									class="p-button-rounded p-button-primary mr-2"
									@click="$emit('sell-detail', slotProps.data)"
								/>
								<Button
									v-if="isColumn(column.variation, 'whatsapp')"
									icon="pi pi-whatsapp"
									class="p-button-rounded p-button-success mr-2"
									@click="$emit('send-whatsapp', slotProps.data)"
								/>
								<Button
									v-if="isColumn(column.variation, 'reader')"
									icon="pi pi-folder-open"
									severity="warning"
									class="p-button-rounded p-button-contrast mr-2"
									rounded
									aria-label="Notification"
									@click="$emit('read-notification', slotProps.data)"
									:disabled="slotProps.data.read === 1"
								/>
							</div>
						</div>
					</template>
				</Column>

				<Column
					:key="column.field"
					:field="column.field"
					:header="column.header"
					v-else-if="isColumn(column.type, 'image')"
				>
					<template #body="slotProps">
						<Image
							v-if="slotProps.data.image !== 'null'"
							preview
							:src="slotProps.data.image"
							alt="Image"
							width="40"
							imageStyle="border-radius: 8px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);padding: 3px; height: 6vh; width: 6vh"
						/>
						<img
							v-else
							src="../../assets/producto-sin-imagen.png"
							alt="Vue"
							class="without-image-product"
						/>
					</template>
				</Column>
			</template>
		</DataTable>
	</div>
</template>

<style lang="scss" scoped>
.without-image-product {
  height: 6vh;
  width: 6vh;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 3px;
}
.about-page {
  .card {
    height: 100%;
    .data-table-container {
      margin-top: 10px;
      .data-table {
        text-align: center;
        .display-flex {
          display: flex;
        }
        .margin-left-auto {
          margin-left: auto;
        }
        .column {
          width: 20px;
        }
      }
    }
  }
}

.margin-auto {
  margin: auto;
}

.product-image {
  width: 70px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  padding: 3px;
}

.headerClass {
  text-align: center !important;
}

.p-column-header-content {
  text-align: center !important;
  align-content: center !important;
}

.p-column-title {
  text-align: center !important;
  align-content: center !important;
}

.without-image-product {
  height: 6vh;
  width: 6vh;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 3px;
}

.header-container {
	display: flex;
	justify-content: space-between;
}
</style>