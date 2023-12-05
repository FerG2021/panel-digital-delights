<template>
    <main>
        <MainCard>
			<template #header>
				<h1> {{ $t('homeSection.title') }} </h1>
			</template>

			<template #content>
				<div class="home-container">
					<div 
						class="item-container"
						v-for="(section, index) in sections"
						:key="index"
					>
						<Card 
							@click="$router.push(section.path)"  
							:section="section"
							class="item"
						></Card>
					</div>
				</div>
			</template>
        </MainCard>
    </main>
</template>

<script>
import Card from '../../components/common/Card.vue';
import { mapGetters } from 'vuex';
import MainCard from '../../components/common/MainCard.vue';

export default {
	name: 'HomeComponent',
	components: {
		Card,
		MainCard
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
.home-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	.item-container {
		margin: 10px;
		.item {
			width: 300px;
		}
	}
}

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
