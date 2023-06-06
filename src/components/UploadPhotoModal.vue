<script setup>
//import { file } from '@babel/types'
import { ref } from 'vue';
import { supabase } from "../supabase"
import { useUserStore } from "../stores/Users"
import { storeToRefs } from 'pinia';

// ***** here we grab current user 
const userStore = useUserStore()
const { addNewPost } = defineProps(['addNewPost'])
const { user } = storeToRefs(userStore)
//**** 
const visible = ref(false);
const caption = ref("")
const file = ref(null)
const loading = ref(false)
const errorMessage = ref("")

const showModal = () => {
  visible.value = true;
};

const handleOk = async () => {
  loading.value = true
  // "from we pick the name of the bucket, in this case "images" and then the upload we give it the path
  // so in this case we will store them in the public folder
  // we generate a random name because they have to be unique and at the end we pass it the file (file.value)
  const fileName = Math.floor(Math.random() * 5000000)
  let filePath
  if (file.value) {
    const response = await supabase.storage.from("images").upload('public/' + fileName, file.value)

    filePath = response.data.path
    if (response.error) {
      loading.value = false
      return errorMessage.value = "oops, something went wrong"
    }
    await supabase.from("posts").insert({
      url: filePath,
      caption: caption.value,
      owner_id: user.value.id
    })

  }
  loading.value = false
  visible.value = false
  caption.value = ""
  addNewPost({
    url: filePath,
    caption: caption.value,
  })
};

const handleUploadChange = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0]
  }
}
</script>
  
<template>
  <div>
    <a-button @click="showModal">Upload photo</a-button>
    <a-modal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input type="file" accept=".jpeg, .png" @change="handleUploadChange">
        <a-input v-model:value="caption" placeholder="Caption..." :maxLength="50" />
        <ATypographyText v-if="errorMessage" type="danger">{{ errorMessage }}</ATypographyText>
      </div>
      <div v-else class="spinner">
        <a-spin />
      </div>

    </a-modal>
  </div>
</template>

<style scoped>
input {
  margin-top: 10px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
  