<template>
    <main>
        <el-card>
            <Title :title="sectionTitle"></Title>

            <div class="grid">
                <div
                    class="col-4 contenedor-card"
                    v-for="(section, index) in sections"
                    :key="index"
                >
                    <Card 
                        @click="$router.push(section.path)"  
                        :section="section"
                    ></Card>
                </div>
            </div>
        </el-card>
    </main>
</template>

<script>
import Card from '../../components/common/Card.vue';
import Title from '../../components/common/Title.vue';

export default {
	components: {
		Card,
		Title,
	},

	data() {
		return {
			sectionTitle: 'Home',
			mesas: [],
			sections: [
				{
					titulo: 'Productos',
					icono: 'restaurant',
					path: '/productos',
				},
				{
					titulo: 'Categorías',
					icono: 'category',
					path: '/categorias',
				},
				{
					titulo: 'Reseñas',
					icono: 'reviews',
					path: '/resenias',
				},
				{
					titulo: 'Mi cuenta',
					icono: 'manage_accounts',
					path: '/mi-cuenta',
				},
			],
		};
	},

	methods: {
	},
};
</script>

<style scoped>
.grid {
  margin-top: 20px;
}
</style>
