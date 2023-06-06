<script setup>
import Container from './Container.vue';
import ImageGallery from './ImageGallery.vue';
import UserBar from './UserBar.vue';
import { ref, onMounted, watch, reactive } from 'vue'
import { supabase } from '../supabase'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/Users'
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { user: loggedInUser } = storeToRefs(userStore)
// here we get the username from the url
const route = useRoute()
const { username } = route.params
//**** 
const posts = ref([])
const user = ref(null)
const isFollowing = ref(null)
const loading = ref(false)
const userInfo = reactive({
    posts: null,
    followers: null,
    following: null
})


const updateIsFollowing = (follow) => {
    isFollowing.value = follow
}
const addNewPost = (post) => {
    posts.value.unshift(post)
}

const fetchData = async () => {
    loading.value = true
    // the .eq means that the username has to be equal to the username in the url.
    const response = await supabase.from("users").select().eq('username', username).single()
    if (!response.data) {
        loading.value = false
        return user.value = null
    }
    user.value = response.data

    const { data: postsData } = await supabase.from("posts").select().eq('owner_id', user.value.id)
    posts.value = postsData
    await fetchIsFollowing()

    // updating userInfo
    const followerCount = await fetchFollowersCount()
    const followingCount = await fetchFollowingCount()

    console.log('this is folowers', followerCount)

    userInfo.followers = followerCount
    userInfo.following = followingCount
    userInfo.posts = posts.value.length

    loading.value = false
}

const fetchIsFollowing = async () => {
    // this "if " ensures that we are logged in, and the second part ensures that it is not our profile, so we do not
    // follow ourselvs
    if (loggedInUser.value && (loggedInUser.value.id !== user.value.id)) {
        const res = await supabase
            .from("followers_following")
            .select()
            .eq('follower_id', loggedInUser.value.id)
            .eq('following_id', user.value.id)
            .single()
        if (res.data) {
            return isFollowing.value = true
        }
    }


}
// we use the watch here because sometimes the loggedIn.value is null and the if in line 44 does not
//execute
watch(loggedInUser, () => {
    fetchIsFollowing()
})
onMounted(() => {
    fetchData()
})

// here we update the user info:
const fetchFollowersCount = async () => {
    const res = await supabase
        .from("followers_following")
        .select('*', { count: 'exact' })
        .eq("following_id", user.value.id)
    return res.count
    // the select means : * is to grab all, and the count:exact tells you how many elements are in the array, if
    // we do a console.log of res, we can see that there is a parameter, if we only do select() is null, if we do it
    // like above this count is the exact count of haw many elements are in the array.
}
const fetchFollowingCount = async () => {
    const res = await supabase
        .from("followers_following")
        .select('*', { count: 'exact' })
        .eq("follower_id", user.value.id)
    return res.count
}


</script>
<template>
    <Container>
        <div class="profile-container" v-if="!loading">
            <!-- by adding the :key we add reactivity, so when username in the params
            changes, the component will re render again, this way
            if we search in the searchbar, the upload photo button will react
            to current user -->
            <UserBar :key="$route.params.username" :searchedUser="user" :userInfo="userInfo" :addNewPost="addNewPost"
                :isFollowing="isFollowing" :updateIsFollowing="updateIsFollowing" />
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