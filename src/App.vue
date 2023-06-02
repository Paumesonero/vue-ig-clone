<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore } from "./stores/Users"
import TheNav from "./components/TheNav.vue"

const userStore = useUserStore()

onMounted(() => {
    userStore.getUser()
})
</script>

<template>
    <main>
        <TheNav />
        <RouterView />
    </main>
</template>

<style scoped></style>
