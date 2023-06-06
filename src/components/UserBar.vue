<script setup>
import UploadPhotoModal from './UploadPhotoModal.vue';
import { useRoute } from 'vue-router'
import { useUserStore } from "../stores/Users"
import { storeToRefs } from 'pinia';
import { supabase } from '../supabase';

// we will compare the current user with the username in the url so only the 
//user that is logged in can add photos to their profile.

// we use use route to get information from the url
const route = useRoute()
const userStore = useUserStore()
// here we grab the current user
const { user } = storeToRefs(userStore)
const { username: profileUserName } = route.params
const { userInfo, addNewPost, searchedUser, isFollowing, updateIsFollowing } = defineProps(['searchedUser', 'userInfo', 'addNewPost', 'isFollowing', 'updateIsFollowing'])


const followUser = async () => {
    updateIsFollowing(true)
    await supabase.from("followers_following").insert({
        follower_id: user.value.id,
        following_id: searchedUser.id
    })
}
const unFollowUser = async () => {
    updateIsFollowing(false)
    await supabase.from("followers_following")
        .delete()
        .eq('follower_id', user.value.id)
        .eq('following_id', searchedUser.id)
}
</script>

<template>
    <div class="userbar-container" v-if="searchedUser">
        <div class="top-content">
            <h2>{{ searchedUser.username }}</h2>
            <div v-if="user">
                <UploadPhotoModal v-if="profileUserName === user.username" :addNewPost="addNewPost" />
                <div v-else>
                    <a-button v-if="!isFollowing" @click="followUser">Follow</a-button>
                    <a-button v-else @click="unFollowUser">Following</a-button>
                </div>

            </div>

        </div>
        <div class="bottom-content">
            <h5>{{ userInfo.posts }} posts</h5>
            <h5>{{ userInfo.followers }} followers</h5>
            <h5>{{ userInfo.following }} following</h5>
        </div>
    </div>
    <div v-else class="userbar-container">
        <h5>User Not Found</h5>
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

.top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>