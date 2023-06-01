<script setup>
import { ref, reactive } from 'vue';
import { useUserStore } from '../stores/Users'
import { storeToRefs } from "pinia"
// store
const userStore = useUserStore()
// storeToRefs should only be ref values and not methods.
const { errorMessage, loading, user } = storeToRefs(userStore)

const props = defineProps(['isLogin'])
const visible = ref(false);

const userCredentials = reactive({
    email: '',
    password: '',
    username: ''
})
const showModal = () => {
    visible.value = true;
};

const clearUserCredentials = () => {
    userCredentials.email = ""
    userCredentials.password = ""
    userCredentials.username = ""
    userStore.clearErrorMessage()
}

const handleOk = async (e) => {
    await userStore.handleSignup(userCredentials)
    if (user.value) {
        clearUserCredentials()
        visible.value = false
    }
};

const handleCancel = () => {
    userStore.clearErrorMessage()
    visible.value = false
}

const title = props.isLogin ? 'Login' : 'Signup'

</script>

<template>
    <div>
        <a-button type="primary" @click="showModal" class="btn">{{ title }}</a-button>
        <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
            <template #footer>
                <a-button key="back" @click="handleCancel">Cancel</a-button>
                <a-button :disabled="loading" key="submit" type="primary" :loading="loading"
                    @click="handleOk">Submit</a-button>
            </template>
            <div v-if="!loading" class="input-container">
                <a-input class="input" v-if="!isLogin" v-model:value="userCredentials.username" placeholder="Username" />
                <a-input class="input" v-model:value="userCredentials.password" placeholder="Password" type="password" />
                <a-input class="input" v-model:value="userCredentials.email" placeholder="Email" />
            </div>
            <div v-else class="spinner">
                <a-spin />
            </div>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </a-modal>
    </div>
</template>
<style scoped>
.input {
    margin-top: 5px;
}

.error {
    color: rgb(190, 5, 5);
}

.input-container {
    height: 120px;
}

.spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
}
</style>