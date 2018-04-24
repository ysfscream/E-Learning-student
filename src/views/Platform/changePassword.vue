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
        <v-flex xs12 md12>
          <v-alert type="error" dismissible v-model="error">
            {{ errorMessage }}
          </v-alert>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="旧密码"
            type="password"
            v-model="passwordForm.oldPassword"
            required>
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="新密码"
            type="password"
            v-model="passwordForm.password"
            required>
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="确认密码"
            type="password"
            v-model="passwordForm.confirmPassword"
            required>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md4 offset-md8>
          <v-btn large color="green darken-1" @click.native="save">确定</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import { httpPut } from '@/utils/api'
import { mapActions } from 'vuex'
import bus from '@/utils/bus'

export default {
  name: 'change-password-view',
  data() {
    return {
      passwordForm: {},
      error: false,
      errorMessage: '',
    }
  },
  computed: {
    student() {
      return this.$store.state.account.student
    },
  },
  methods: {
    ...mapActions(['STUDENT_LOGOUT']),
    save() {
      if (this.passwordForm.password !== this.passwordForm.confirmPassword) {
        this.error = true
        this.errorMessage = '两次密码不一致'
        return
      }
      if (!this.passwordForm.password
            || !this.passwordForm.oldPassword
            || !this.passwordForm.confirmPassword
      ) {
        this.error = true
        this.errorMessage = '请填写完整的表单'
        return
      }
      const data = this.passwordForm
      const id = this.student.id
      httpPut(`/students/password/${id}`, data).then((response) => {
        if (response.data.status === 201) {
          bus.$emit('isWarning', {
            snackbar: true,
            snackbarTitle: '修改成功，请重新登录',
            snackbarColor: 'green',
          })
          this.teacherPasswordForm = {}
          this.STUDENT_LOGOUT()
          this.$router.push('/home')
        }
      }).catch((error) => {
        this.error = true
        this.errorMessage = error.response.data.message
      })
    },
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
