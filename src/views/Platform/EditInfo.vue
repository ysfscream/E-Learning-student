<template>
  <div class="edit-info-view">
    <h2 class="display-5">
      修改个人信息 <v-icon>build</v-icon>
    </h2>
    <br>
    <v-divider></v-divider>
    <br>
    123
  </div>
</template>


<script>
import { httpGet } from '@/utils/api'

export default {
  name: 'edit-info-view',
  data() {
    return {
      studentForm: {},
    }
  },
  methods: {
    loadData() {
      httpGet('/home/getRecommend').then((response) => {
        console.log(response)
      })
    },
    save() {
    },
  },
  created() {
    this.loadData()
  },
}
</script>


<style lang="scss" scoped>
.edit-info-view {
  h2 {
    margin: 20px 0 0 0;
  }
}
</style>
