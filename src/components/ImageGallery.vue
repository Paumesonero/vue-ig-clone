<script setup>

const { posts } = defineProps(['posts'])
</script>
<template>
    <div class="gallery-container">
        <img v-for="el in posts" :key="el.id"
            :src="`https://suqeynrwubzivsrsaeyz.supabase.co/storage/v1/object/public/images/${el.url}`" alt="elantris">
    </div>
</template>

<style scoped>
.gallery-container {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
}

img {
    margin: 5px;
    width: 200px;
}
</style>