<template>
  <v-app id="inspire" :dark="isDark">
     <v-snackbar
      :color="snackbarColor"
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar">
      {{ snackbarTitle }}
    </v-snackbar>

    <v-navigation-drawer fixed clipped v-model="drawer" app>
      <v-list dense>
        <v-subheader class="mt-3 grey--text text--darken-1">平台资源</v-subheader>
        <v-list-tile
          v-for="item in conentList"
          :key="item.text"
          @click="$router.push({ path: item.router })">
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
          <v-list-tile
            v-for="(item, index) in tagList"
            :key="index"
            avatar
            @click="$router.push({ path: `/tags/${item}` })">
            <v-list-tile-action>
              <v-icon>loyalty</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list-tile v-if="!student.token" class="mt-3" @click="loginDialog = true">
          <v-list-tile-action>
            <v-icon color="darken-1">account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="text--darken-1">登录到您的账户</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="!student.token" class="mt-3" @click="registerDialog = true">
          <v-list-tile-action>
            <v-icon color="darken-1">fiber_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="text--darken-1">暂无账号？立即注册</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="student.token" class="mt-3" avatar>
          <v-list-tile-avatar>
            <img :src="student.headImg" alt="">
          </v-list-tile-avatar>
          <v-list-tile-title v-text="student.studentName"></v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="student.token" class="mt-3" @click="sheet = true">
          <v-list-tile-action>
            <v-icon color="darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="text--darken-1">
            设置您的账户
          </v-list-tile-title>
        </v-list-tile>
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
        <v-list-tile v-if="student.token" class="mt-3" @click="logoutDialog = true">
          <v-list-tile-action>
            <v-icon color="darken-1">directions_run</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="text--darken-1">
            退出登录
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
                    label="学号"
                    v-model="loginStudentForm.studentID"
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
      <v-dialog v-model="logoutDialog" max-width="420">
        <v-card>
          <v-card-title class="headline">确定要退出登录？</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat="flat" @click.native="logoutDialog = false">
              取消
            </v-btn>
            <v-btn color="green darken-1" flat="flat" @click.native="logout">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-bottom-sheet v-model="sheet">
        <v-list>
          <v-subheader>请选择</v-subheader>
          <v-list-tile
            v-for="tile in tiles"
            :key="tile.title"
            @click="$router.push({ path: `${tile.router}/${student.id}` })"
            class="mt-4">
            <v-list-tile-avatar>
              <v-avatar size="32px" tile>
                <img :src="`/static/doc-images/bottom-sheets/${tile.img}`" :alt="tile.title">
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-bottom-sheet>

  </v-app>
</template>


<script>
import { httpGet, httpPost, httpPut } from '@/utils/api'
import bus from '@/utils/bus'
import { mapActions } from 'vuex'

export default {
  name: 'layouts-view',
  data() {
    return {
      registerDialog: false,
      loginDialog: false,
      logoutDialog: false,
      drawer: true,
      error: false,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      changeColor: true,
      snackbarTitle: '',
      snackbarColor: '',
      isDark: this.$store.state.themeColor.isDark,
      conentList: [
        { icon: 'trending_up', text: '最受欢迎', router: '/popular' },
        { icon: 'subscriptions', text: '最新上传', router: '/news' },
        { icon: 'whatshot', text: '点赞最多', router: '/likes' },
        { icon: 'share', text: '全部分享', router: '/allShares' },
      ],
      tagList: [],
      loginStudentForm: {},
      registerStudentForm: {},
      remember: true,
      professionList: [],
      sheet: false,
      tiles: [
        { img: 'info.png', title: '修改个人信息', router: '/editInfo' },
        { img: 'Password.png', title: '更改密码', router: '/ChangePassword' },
      ],
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
    $route() {
      this.sheet = false
    },
  },
  computed: {
    student() {
      return this.$store.state.account.student
    },
  },
  methods: {
    ...mapActions(['CHANGE_THEME', 'STUDENT_LOGIN', 'STUDENT_LOGOUT']),
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
            this.snackbarTitle = '注册成功，可以登录'
            this.snackbarColor = 'green'
          }
        }).catch((error) => {
          this.snackbar = true
          this.snackbarTitle = error.response.data.message
          this.snackbarColor = 'red'
        })
      }
    },
    login() {
      const data = this.loginStudentForm
      if (!this.loginStudentForm.studentID || !this.loginStudentForm.password) {
        this.snackbar = true
        this.snackbarTitle = '请填写完整信息'
        this.snackbarColor = 'red'
      } else {
        httpPost('/students/login', data).then((response) => {
          if (response.data.status === 200) {
            const studentInfo = response.data.items
            this.loginDialog = false
            this.loginStudentForm = {}
            this.snackbar = true
            this.snackbarTitle = '登录成功'
            this.snackbarColor = 'green'
            this.STUDENT_LOGIN({ student: studentInfo, remember: this.remember })
          }
        }).catch((error) => {
          this.loginStudentForm = {}
          this.snackbar = true
          this.snackbarTitle = error.response.data.message
          this.snackbarColor = 'red'
        })
      }
    },
    logout() {
      const id = this.student.id
      httpPut('/students/logout', { id }).then((response) => {
        if (response.data.status === 201) {
          this.STUDENT_LOGOUT()
          this.logoutDialog = false
          this.loadTags()
        }
      })
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
    bus.$on('isWarning', (event) => {
      this.snackbar = event.snackbar
      this.snackbarTitle = event.snackbarTitle
      this.snackbarColor = event.snackbarColor
    })
    this.loadTags()
  },
}
</script>
