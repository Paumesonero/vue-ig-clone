<script setup>
const props = defineProps(['card'])
</script>
<template>
    <a-card hoverable style="width: 240px" class="card">
        <template #cover>
            <img alt="elantris character" :src="props.card.imgUrl" />
        </template>
        <a-card-meta :title="props.card.username">
            <template #description>{{ props.card.caption }}</template>
        </a-card-meta>
    </a-card>
</template>
<style scoped>
.card {
    margin-bottom: 10px;
}
</style>