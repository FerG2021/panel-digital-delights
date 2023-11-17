<template>
    <main>
        <div class="home">
            <TitleComponent :title="sectionTitle" />

            <div class="grid">
                <div
                    class="col-4 contenedor-card"
                    v-for="(section, index) in sections"
                    :key="index"
                >
                    <Card 
                        @click="$router.push(section.path)"  
                        :section="section"
						class="card"
                    ></Card>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Card from '../../components/common/Card.vue';
import TitleComponent from '../../components/common/Title.vue';
import { mapGetters } from 'vuex';

export default {
	name: 'HomeComponent',
	components: {
		Card,
		TitleComponent,
	},

	data() {
		return {
			sectionTitle: 'Home',
		};
	},

	computed: {
		...mapGetters('UsersStore', ['modules']),

		sections() {
			let sections = [];

			for (const module of this.modules) {
				if (module.showInHome !== false) {
					sections.push({
						titulo: module.title,
						icono: module.icon,
						path: module.path

					});
				}
			}

			return sections;
		}
	},
};
</script>

<style lang="scss" scoped>
.home {
	height: 100%;
	background-color: var(--white);
	.grid {
		margin-top: 20px;
		.contenedor-card {
			.card {
				background-color: var(--light);
				&:hover {
					background-color: var(--light-card-hover);
				}
			}
		}
	}
}
</style>
