<script setup>
import Container from './Container.vue';
import ImageGallery from './ImageGallery.vue';
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
            <ImageGallery :posts="[{
                id: 1,
                img: 'https://www.17thshard.com/forum/uploads/monthly_2020_10/IMG_20201003_154853.JPG.dacbb3fcbb3e2933e4bc739739b47536.JPG'
            },
            {
                id: 2,
                img: 'https://www.brandonsanderson.com/wp-content/uploads/2019/11/00_elantris_us.jpg'
            }]" />
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