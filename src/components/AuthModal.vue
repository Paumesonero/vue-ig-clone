
<script setup>
import { ref } from 'vue';

const props = defineProps(['isLogin'])
const visible = ref(false);

const showModal = () => {
    visible.value = true;
};

const handleOk = (e) => {
    console.log(e);
    visible.value = false;
};

const title = props.isLogin ? 'Login' : 'Signup'

</script>

<template>
    <div>
        <a-button type="primary" @click="showModal" class="btn">{{ title }}</a-button>
        <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
            <a-input class="input" v-if="!isLogin" v-model:value="value" placeholder="Username" />
            <a-input class="input" v-model:value="value" placeholder="Password" />
            <a-input class="input" v-model:value="value" placeholder="Email" />
        </a-modal>
    </div>
</template>
<style scoped>
.input {
    margin-top: 5px;
}
</style>