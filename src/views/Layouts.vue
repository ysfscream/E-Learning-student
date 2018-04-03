<template>
  <v-app id="inspire" :dark="isDark">
    <v-navigation-drawer fixed clipped v-model="drawer" app>
      <v-list dense>
        <v-subheader class="mt-3 grey--text text--darken-1">平台资源</v-subheader>
        <v-list-tile v-for="item in conentList" :key="item.text" @click="save">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-subheader class="mt-3 grey--text text--darken-1">标签分类</v-subheader>
        <v-list>
          <v-list-tile v-for="(item, index) in tagList" :key="index" avatar @click="save">
            <v-list-tile-action>
              <v-icon>loyalty</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list-tile class="mt-3" @click="loginDialog = true">
          <v-list-tile-action>
            <v-icon color="darken-1">account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="text--darken-1">登录到您的账户</v-list-tile-title>
        </v-list-tile>
        <v-list-tile class="mt-3" @click="registerDialog = true">
          <v-list-tile-action>
            <v-icon color="darken-1">fiber_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="text--darken-1">暂无账号？立即注册</v-list-tile-title>
        </v-list-tile>

        <!-- <v-list-tile @click="save">
          <v-list-tile-action>
            <v-icon color="darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="text--darken-1">
            设置您的个人用户
          </v-list-tile-title>
        </v-list-tile> -->
        <v-list-tile class="mt-3">
          <v-list-tile-action>
            <v-icon color="darken-1">invert_colors</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="text--darken-1">
            <v-switch
            style="height: 100px"
            class="ml-1 mb-5 pb-5"
            :label="isDark ? '深色主题' : '浅色主题'"
            v-model="changeColor">
            </v-switch>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="white--text nav-bar" color="red" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <i style="padding-left:20px" class="material-icons">video_library</i>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title" style="margin:10px">
          <a href="/" style="color:white">易学</a>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 450px">
        <v-text-field
          color="white"
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb="() => {}"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-toolbar>

    <v-content>
      <v-container app>
        <router-view/>
      </v-container>
    </v-content>

    <v-layout row justify-center>
      <v-dialog v-model="loginDialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">账户登录</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="邮箱"
                    v-model="loginStudentForm.email"
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="密码"
                    v-model="loginStudentForm.password"
                    type="password"
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-switch
                    label="保持登录"
                    v-model="remember">
                  </v-switch>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="loginDialog = false">离开</v-btn>
            <v-btn color="blue darken-1" flat @click.native="login">登录</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="registerDialog"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable>
        <v-card tile>
          <v-toolbar card dark color="purple">
            <v-btn icon @click.native="registerDialog = false" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>注册账户</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="register">立即注册</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md12>
                  <v-alert type="error" dismissible v-model="error">
                    请填写完整的表单
                  </v-alert>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="学号"
                    v-model="registerStudentForm.studentID"
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="姓名"
                    v-model="registerStudentForm.studentName"
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    label="专业"
                    :items="professionList"
                    v-model="registerStudentForm.professional"
                    item-value="text"
                    required>
                  </v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="班级"
                    placeholder="例如：14001"
                    v-model="registerStudentForm.className"
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="邮箱"
                    v-model="registerStudentForm.email"
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="密码"
                    type="password"
                    v-model="registerStudentForm.password"
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-radio-group v-model="registerStudentForm.gender" row>
                    <v-radio label="男" value="男"></v-radio>
                    <v-radio label="女" value="女"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12 md12>
                  <span style="color:#E57373;">* 号为必填，点击右上角，立即注册</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <div style="flex: 1 1 auto;"/>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-snackbar
      :timeout="timeout"
      color="green"
      :top="true"
      multi-line="multi-line"
      vertical="vertical"
      v-model="snackbar">
      注册成功，可以登录！
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

  </v-app>
</template>


<script>
import { httpGet, httpPost } from '@/utils/api'
import { mapActions } from 'vuex'

export default {
  name: 'layouts-view',
  data() {
    return {
      registerDialog: false,
      loginDialog: false,
      drawer: true,
      error: false,
      snackbar: false,
      timeout: 6000,
      changeColor: true,
      isDark: this.$store.state.themeColor.isDark,
      conentList: [
        { icon: 'trending_up', text: '最受欢迎' },
        { icon: 'subscriptions', text: '最新上传' },
        { icon: 'whatshot', text: '点赞最多' },
        { icon: 'share', text: '全部分享' },
      ],
      tagList: [],
      loginStudentForm: {},
      registerStudentForm: {},
      remember: true,
      professionList: [],
    }
  },
  watch: {
    registerDialog() {
      if (this.registerDialog) {
        this.loadProfession()
      } else {
        this.error = false
      }
    },
    changeColor() {
      this.changeTheme()
    },
  },
  methods: {
    ...mapActions(['CHANGE_THEME']),
    save() {
      console.log('123')
    },
    register() {
      if (
        !this.registerStudentForm.studentID
      || !this.registerStudentForm.studentName
      || !this.registerStudentForm.email
      || !this.registerStudentForm.professional
      || !this.registerStudentForm.className
      || !this.registerStudentForm.password
      || !this.registerStudentForm.gender
      ) {
        this.error = true
      } else {
        const data = this.registerStudentForm
        httpPost('/students/register', data).then((response) => {
          if (response.data.status === 201) {
            this.registerDialog = false
            this.registerStudentForm = {}
            this.snackbar = true
          }
        })
      }
    },
    login() {
      console.log(this.loginStudentForm)
    },
    loadProfession() {
      httpGet('/departments/professions').then((response) => {
        if (response.data.status === 200) {
          this.professionList = response.data.items
        }
      })
    },
    loadTags() {
      httpGet('/departments/tags').then((response) => {
        if (response.data.status === 200) {
          this.tagList = response.data.items
        }
      })
    },
    changeTheme() {
      this.isDark = !this.isDark
      this.CHANGE_THEME({ theme: this.isDark })
    },
  },
  created() {
    this.loadTags()
  },
}
</script>
