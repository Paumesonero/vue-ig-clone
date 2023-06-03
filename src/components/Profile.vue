<script setup>
import Container from './Container.vue';
import ImageGallery from './ImageGallery.vue';
import UserBar from './UserBar.vue';
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useRoute } from 'vue-router'

// here we get the username from the url
const route = useRoute()
const { username } = route.params
//**** 
const posts = ref([])
const user = ref(null)
const loading = ref(false)

const addNewPost = (post) => {
    posts.value.unshift(post)
}

const fetchData = async () => {
    loading.value = true
    // the .eq means that the username has to be equal to the username in the url.
    const response = await supabase.from("users").select().eq('username', username).single()
    console.log('step1', response)
    if (!response.data) {
        loading.value = false
        return user.value = null
    }
    user.value = response.data

    const { data: postsData } = await supabase.from("posts").select().eq('owner_id', user.value.id)
    posts.value = postsData
    loading.value = false
}

onMounted(() => {
    fetchData()
})


</script>
<template>
    <Container>
        <div class="profile-container" v-if="!loading">
            <!-- by adding the :key we add reactivity, so when username in the params
            changes, the component will re render again, this way
            if we search in the searchbar, the upload photo button will react
            to current user -->
            <UserBar :key="$route.params.username" :searchedUser="user" :userInfo="{
                posts: 4,
                followers: 100,
                following: 233
            }" :addNewPost="addNewPost" />
            <ImageGallery :posts="posts" />
        </div>
        <div class="spinner" v-else>
            <a-spin />
        </div>

    </Container>
</template>
<style scoped>
.profile-container {
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
}

.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85vh;
}
</style>