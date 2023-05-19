<script setup>
import Card from "./Card.vue"
import Container from "./Container.vue"

const data = [
    {
        id: 1,
        username: 'Raoden',
        imgUrl: 'https://www.17thshard.com/forum/uploads/monthly_2020_02/5e5925e6c0f27_RaodenElantrianbyHayley_Olivia.jpg.6304fb983eb771421ea0c290b85c3685.jpg',
        caption: 'Power of light is within me'
    },
    {
        id: 2,
        username: 'Serene',
        imgUrl: 'https://external-preview.redd.it/Oh15w2jXl6e6KU1QxbwnrizFQ0pJx1pzvtBCifxOrnc.jpg?auto=webp&s=14d85eb737190d885c9db5e7942afc5119144dde',
        caption: 'Teod will prevale'
    },
    {
        id: 3,
        username: 'Hrathen',
        imgUrl: 'https://i.pinimg.com/originals/a9/b9/64/a9b96405c8b540b1be605d095bb9a30c.jpg',
        caption: 'Skavaris'
    }
]
</script>
<template>
    <div>
        <Container>
            <div class="timeline-container">
                <Card v-for="el in data" :key="el.id" :card="el" />
            </div>

        </Container>
    </div>
</template>
<style scoped>
.timeline-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0px;
}
</style>