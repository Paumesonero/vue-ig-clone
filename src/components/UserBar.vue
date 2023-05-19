<script setup>
const { userName, userInfo } = defineProps(['userName', 'userInfo'])
</script>

<template>
    <div class="userbar-container">
        <div class="top-content">
            <h2>{{ userName }}</h2>
        </div>
        <div class="bottom-content">
            <h5>{{ userInfo.posts }} posts</h5>
            <h5>{{ userInfo.followers }} followers</h5>
            <h5>{{ userInfo.following }} following</h5>
        </div>
    </div>
</template>

<style scoped>
.userbar-container {
    padding-bottom: 75px;
}

.bottom-content {
    display: flex;
    align-items: center;
}

.bottom-content h5 {
    margin: 0;
    padding: 0;
    margin-right: 30px;
}
</style>