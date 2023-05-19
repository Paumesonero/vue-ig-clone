<script setup>
import { RouterLink, useRouter } from 'vue-router'
import Container from "./Container.vue"
import AuthModal from "./AuthModal.vue"
import { ref } from 'vue'

const router = useRouter()
const searchUser = ref('')
const isAthenticated = ref(false)
const onSearch = () => {
    if (searchUser.value) {
        router.push(`/profile/${searchUser.value}`)
        searchUser.value = ''
    }
}

</script>
<template>
    <a-layout-header>
        <Container>
            <div class="nav-container">
                <div class="right-content">
                    <RouterLink to="/">Instagram</RouterLink>
                    <a-input-search v-model:value="searchUser" placeholder="username..." style="width: 200px"
                        @search="onSearch" />
                </div>
                <div class="left-content" v-if="!isAthenticated">
                    <AuthModal :isLogin="false" />
                    <AuthModal :isLogin="true" />
                </div>
                <div class="left-content" v-else>
                    <a-button type="primary">Profile</a-button>
                    <a-button type="primary">Logout</a-button>
                </div>

            </div>

        </Container>
    </a-layout-header>
</template>

<style scoped>
.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.right-content {
    display: flex;
    align-items: center;
    gap: 20px;
}

.left-content {
    display: flex;
    gap: 15px;
}
</style>