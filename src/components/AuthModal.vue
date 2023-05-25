<script setup>
import { ref, reactive } from 'vue';
import { useUserStore } from '../stores/Users'
import { storeToRefs } from "pinia"
// store
const userStore = useUserStore()
// storeToRefs should only be ref values and not methods.
const { errorMessage } = storeToRefs(userStore)

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

const handleOk = (e) => {
    userStore.handleSignup(userCredentials)
};

const title = props.isLogin ? 'Login' : 'Signup'

</script>

<template>
    <div>
        <a-button type="primary" @click="showModal" class="btn">{{ title }}</a-button>
        <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
            <a-input class="input" v-if="!isLogin" v-model:value="userCredentials.username" placeholder="Username" />
            <a-input class="input" v-model:value="userCredentials.password" placeholder="Password" type="password" />
            <a-input class="input" v-model:value="userCredentials.email" placeholder="Email" />
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
</style>