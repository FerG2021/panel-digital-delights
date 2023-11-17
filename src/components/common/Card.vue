<template>
    <Card class="card">
        <template #title>
            <h3 class="title-card">
                {{ section.titulo }}
            </h3>
        </template>

        <template #content>
            <div class="icon-card-container">
                <span class="material-icons icon-card">
                    {{ section.icono }}
                </span>
            </div>
        </template>
    </Card>
</template>

<script>
export default {
	name: 'CardComponent',
	props: {
		section: {
			type: Object,
			required: true,
		}
	}
};
</script>

<style lang="scss" scoped>
    .card {
        margin: auto;
        width: 80%;
        background-color: var(--background-card);
        color: var(--dark);
        border-radius: 12px;
        &:hover {
            cursor: pointer;
            background-color: var(--background-card-hover);
        }
        .title-card {
            text-align: center;
        }
        .icon-card-container {
            display: flex;
            .icon-card {
                font-size: 10vh;
                text-align: center;
                margin: auto;
                transition: 0.3s;
            }
        }
    }
</style>