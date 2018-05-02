<template>
  <div class="upload-head-img-view">
    <v-card>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 md12>
            <v-avatar
              size="100px"
              class="headImg grey lighten-4">
              <img :src="imgSrc" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex xs12 md6>
            <v-btn
              color="blue"
              @click="$refs.img.click()"
              class="white--text">
              选择头像
              <v-icon right dark>insert_drive_file</v-icon>
            </v-btn>
            <form>
              <input style="display:none" id="img" ref="img" type="file" @change="readFile" />
            </form>
          </v-flex>
          <v-flex xs12 md6>
            <v-btn
              :loading="loading"
              :disabled="!isSelected"
              color="blue-grey"
              @click="uploadFile"
              class="white--text">
              上传头像
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'upload-head-img-view',
  props: {
    url: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      isSelected: false,
    }
  },
  methods: {
    readFile() {
      this.isSelected = true
      const blob = new Blob([this.$refs.img.files[0]])
      const imgURL = URL.createObjectURL(blob)
      this.$emit('update:imgSrc', imgURL)
      URL.revokeObjectURL(blob)
    },
    uploadFile() {
      this.loading = true
      const url = `/e_api${this.url}`
      const headers = { 'Content-Type': 'multipart/form-data' }
      const data = this.$refs.img.files[0]
      const formData = new FormData()
      formData.append('image', data) // image 就为 后端所需的 name 值
      axios({
        headers,
        method: 'post',
        url,
        data: formData,
      }).then((response) => {
        const headImg = response.data.filename
        this.$emit('changeHeadImg', headImg)
        this.loading = false
        this.isSelected = false
      })
    },
  },
}
</script>


<style lang="scss" scoped>
.upload-head-img-view {
  .headImg {
    position: relative;
    box-shadow: 0px 2px 5px rgb(94, 94, 94);
    bottom: 40px;
    margin-bottom: 20px;
  }
}
</style>
