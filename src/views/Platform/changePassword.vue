<template>
  <div class="change-password-view">
    <h2 class="display-5">
      更改密码 <v-icon>lock_open</v-icon>
    </h2>
    <br>
    <v-divider></v-divider>
    <br>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            label="旧密码"
            v-model="passwordForm.oldPassword"
            required>
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="新密码"
            v-model="passwordForm.oldPassword"
            required>
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="确认密码"
            v-model="passwordForm.oldPassword"
            required>
          </v-text-field>
        </v-flex>
        <v-flex xs6 md4 offset-md8>
          <v-btn color="green darken-1" @click.native="save">确定</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import { httpGet } from '@/utils/api'

export default {
  name: 'change-password-view',
  data() {
    return {
      passwordForm: {},
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


<style lang="scss">
.change-password-view {
  h2 {
    margin: 20px 0 0 0;
  }
}
</style>
