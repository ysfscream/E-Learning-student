<template>
  <div class="docs-view">
    <div class="title"><v-icon >picture_as_pdf</v-icon> 阅读文档 </div>
    <v-divider class="mb-4"></v-divider>

    <v-card>
      <iframe
        style="border: none"
        class="pdf-viewer"
        :src="`/static/pdf/web/viewer.html?file=/public/uploads/docs/${filename}`"
        width="100%" height="600"
        scrolling="no">
        您的浏览器不支持PDF阅读
      </iframe>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class=".headline">{{ doc.title }}</div>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>favorite</v-icon>
        </v-btn>
        <span>{{ doc.likes }}</span>
        <v-spacer></v-spacer>
        <span>{{ doc.view }} 次阅读</span>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>

    <v-divider class="mt-4"></v-divider>

    <div class="docs-view-content">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <p class="title">
              上传教师：
            </p>
            <p class="subheading">
              {{ doc.teacherName }}
            </p>
            <br>
            <p class="title">文档描述：</p>
            <p class="subheading">
              {{ doc.description }}
            </p>
            <br>
            <p class="title">标签：</p>
            <p class="subheading">
              <v-chip color="indigo" text-color="white">
                <v-avatar>
                  <v-icon>code</v-icon>
                </v-avatar>
                {{ doc.tag }}
              </v-chip>
            </p>
            <br>
          </v-flex>
          <v-flex xs12 md6>
            <v-toolbar color="deep-orange accent-2">
              <v-icon >book</v-icon>
              <v-toolbar-title style="color:white">该教师的全部文档</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card class="docs-list">
              <v-list two-line>
                <template v-for="(item, index) in allDocs">
                  <v-list-tile
                    avatar
                    ripple
                    :key="item.title">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      <v-list-tile-sub-title style="width:80%;">
                        {{ item.description }}
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-list-tile-action-text>
                        <v-btn
                          color="green"
                          @click="view(item.docsId, item.teacherName)">
                          阅读
                        </v-btn>
                      </v-list-tile-action-text>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider v-if="index + 1 < allDocs.length" :key="index"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-divider class="mt-4"></v-divider>

    </div>
  </div>
</template>

<script>
import { httpGet } from '@/utils/api'

export default {
  name: 'docs-view',
  data() {
    return {
      doc: {},
      allDocs: [],
      filename: '',
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    teacherName() {
      return this.$route.query.teacher
    },
  },
  methods: {
    loadData() {
      httpGet(`/students/getDocs/${this.id}?teacherName=${this.teacherName}`).then((response) => {
        this.doc = response.data.items.currentDoc
        this.allDocs = response.data.items.restDocs
        const filenameList = this.doc.doc.split('/')
        this.filename = filenameList[filenameList.length - 1]
      })
    },
    view(id, teacherName) {
      this.$router.push({
        path: `/docsView/${id}`,
        query: {
          teacher: teacherName,
        },
      })
      this.loadData()
    },
  },
  created() {
    this.loadData()
  },
}
</script>


<style lang="scss">
.docs-view {
  .title {
    margin: 20px 0 30px 0;
  }
  .docs-view-content {
    margin: 40px 0 20px 0;
  }
  .docs-list {
    height: 400px !important;
    overflow: scroll;
  }
}
</style>
