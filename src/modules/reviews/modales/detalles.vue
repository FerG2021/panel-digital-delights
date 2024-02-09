<template>
	<div>
		<Toast />

		<Dialog
			v-model:visible="display"
			icon="pi pi-refresh"
			:style="{ width: '45%' }"
			class="flex justify-content-center"
			:draggable="false"
		>
			<template #header>
				<h3 style="margin: 0px">
					<i class="pi pi-eye" style="font-size: 20px" /> Detalles de reseña
				</h3>
			</template>

			<div style="display: flex" v-if="loading == true">
				<ProgressSpinner
					aria-label="Basic ProgressSpinner"
					style="margin: auto"
				/>
			</div>

			<div style="margin-top: 5px; width: 100%" v-else>
				<!-- Nombre -->
				<div style="margin-top: 10px">
					<label for="nombre">Nombre</label>
					<InputText
						id="nombre"
						v-model="resenia.name"
						style="width: 100%"
						disabled
					/>
				</div>

				<!-- Email -->
				<div style="margin-top: 10px">
					<label for="email">Email</label>
					<InputText
						id="email"
						v-model="resenia.email"
						style="width: 100%"
						disabled
					/>
				</div>

				<!-- Rating -->
				<div style="margin-top: 10px">
					<label for="rating">Valoración</label>
					<Rating
						id="rating"
						:modelValue="resenia.rating"
						:readonly="true"
						:cancel="false"
					/>
				</div>

				<!-- Descripción -->
				<div style="margin-top: 10px">
					<label for="description">Descripción</label>
					<Textarea
						id="description"
						v-model="resenia.description"
						:autoResize="true"
						rows="5"
						cols="30"
						disabled
						style="width: 100%"
					/>
				</div>
			</div>
		</Dialog>
	</div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

export default {
	name: 'DetailsComponent',
	components: {},
	setup: () => ({ v$: useVuelidate() }),

	data() {
		return {
			display: false,
			submitted: false,
			isFormValid: false,
			loadingBtnGuardar: false,
			loading: true,
			filters: {
				global: {
					value: null,
					matchMode: FilterMatchMode.CONTAINS
				}
			},
			// form
			id: null,
			resenia: null
		};
	},

	validations() {
		return {
			nombre: {
				required: helpers.withMessage('El nombre es requerido', required)
				// email,
			}
		};
	},

	methods: {
		abrir(id) {
			this.id = id;
			this.submitted = false;
			this.display = true;
			this.loading = true;
			// this.isFormValid = false;
			this.getDatos();
		},

		cerrar() {
			this.$toast.add({
				severity: 'error',
				summary: 'Ventana cerrada con éxito',
				detail: 'Message Content',
				life: 3000
			});
			this.display = false;
		},

		async getDatos() {
			this.loading = true;

			await this.axios.get('/api/resenia/' + this.id).then((response) => {
				if (response.data.code == 200) {
					this.resenia = response.data.data;
				} else {
					for (const property in response.data.data) {
						this.$toast.add({
							severity: 'error',
							summary: 'Se ha producido un error',
							detail: `${response.data.data[property]}`,
							life: 5000
						});
					}
				}

				this.loading = false;
			});

			this.loadingBtnGuardar = false;
		},

		async eliminar(row) {
			this.$confirm.require({
				header: 'Confirmación',
				message: '¿Está seguro que desea eliminar la subcategoría?',
				icon: 'pi pi-info-circle',
				acceptClass: 'p-button-danger',
				acceptIcon: 'pi pi-check',
				rejectIcon: 'pi pi-times',
				accept: () => {
					this.eliminarSubcategoria(row);
				},
				reject: () => {
					// this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
				},
				onHide: () => {
					// this.$toast.add({severity:'error', summary:'Hide', detail:'You have hidden', life: 3000});
				}
			});
		},

		async eliminarSubcategoria(row) {
			await this.axios
				.delete('/api/subcategoria/' + row.data.id)
				.then((response) => {
					if (response.data.code == 200) {
						this.$toast.add({
							severity: 'success',
							summary: 'Mensaje de confirmación',
							detail: 'Subcategoría eliminada con éxito',
							life: 3000
						});
						this.getDatos();
					}
				});
		}
	}
};
</script>

<style scoped>
.field {
  margin-bottom: 1.5rem;
}

.header {
  margin: 0px !important;
}

.p-dialog {
  border-radius: 30% !important;
}
</style>
