<template>
  <div class="edit-student-view">
    <h2 class="display-5">
      修改信息 <v-icon>build</v-icon>
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
          <upload-head-img
            @changeHeadImg="changeHeadImg"
            :imgSrc.sync="studentForm.headImg"
            url="/upload/image">
          </upload-head-img>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="学号"
            v-model="studentForm.studentID"
            required>
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="姓名"
            v-model="studentForm.studentName"
            required>
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="班级"
            v-model="studentForm.className"
            required>
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-select
            label="专业"
            :items="professionList"
            v-model="studentForm.professional"
            item-value="text"
            required>
          </v-select>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="邮箱"
            v-model="studentForm.email"
            required>
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="电话"
            v-model="studentForm.phone">
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="学生格言"
            textarea
            v-model="studentForm.description">
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-radio-group v-model="studentForm.gender" row>
            <v-radio label="男" value="男"></v-radio>
            <v-radio label="女" value="女"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs12 md4 offset-md8>
          <v-btn large color="green darken-1" @click.native="save">确定</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import { httpPut, httpGet } from '@/utils/api'
import bus from '@/utils/bus'
import uploadHeadImg from '@/components/common/uploadHeadImg'

export default {
  name: 'edit-student-view',
  data() {
    return {
      studentForm: {},
      professionList: [],
      error: false,
      errorMessage: '',
    }
  },
  components: {
    uploadHeadImg,
  },
  computed: {
    student() {
      return this.$store.state.account.student
    },
  },
  methods: {
    loadData() {
      const id = this.student.studentID
      httpGet(`/students/${id}`).then((response) => {
        this.studentForm = response.data.items.student
      })
    },
    changeHeadImg(val) {
      const id = this.student.studentID
      const data = {
        headImg: val,
      }
      httpPut(`/students/headImg/${id}`, data).then((response) => {
        if (response.data.status === 201) {
          bus.$emit('isWarning', {
            snackbar: true,
            snackbarTitle: '头像上传成功!',
            snackbarColor: 'green',
          })
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
    save() {
      if (!this.studentForm.studentName
            || !this.studentForm.studentID
            || !this.studentForm.email
            || !this.studentForm.className
            || !this.studentForm.professional
      ) {
        this.error = true
        this.errorMessage = '请填写完整的表单'
        return
      }
      const data = this.studentForm
      const id = this.student.studentID
      httpPut(`/students/info/${id}`, data).then((response) => {
        if (response.data.status === 201) {
          bus.$emit('isWarning', {
            snackbar: true,
            snackbarTitle: '修改成功!',
            snackbarColor: 'green',
          })
          this.$router.push('/home')
        }
      }).catch((error) => {
        this.error = true
        this.errorMessage = error.response.data.message
      })
    },
  },
  created() {
    this.loadData()
    this.loadProfession()
  },
}
</script>


<style lang="scss">
.edit-student-view {
  h2 {
    margin: 20px 0 0 0;
  }
}
</style>
