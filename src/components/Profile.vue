<script setup>
import Container from './Container.vue';
import UserBar from './UserBar.vue';

</script>
<template>
    <Container>
        <div class="profile-container">
            <UserBar userName="raoden" :userInfo="{
                    posts: 4,
                    followers: 100,
                    following: 233
                }" />
            <h2>Gallery</h2>
        </div>
    </Container>
</template>
<style scoped>
.profile-container {
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
}
</style>