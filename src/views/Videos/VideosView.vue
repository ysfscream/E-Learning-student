<template>
  <div class="videos-view">
    <div class="title"><v-icon>shop</v-icon> 观看视频 </div>

    <v-divider class="mb-4"></v-divider>

    <v-card>
      <video
        id="video-view-player"
        class="video-js"
        controls
        :src="video.video"
        preload="auto"
        data-setup='{}'>
      </video>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class=".headline">{{ video.title }}</div>
        <v-spacer></v-spacer>
        <v-btn icon @click="like">
          <v-icon>favorite</v-icon>
        </v-btn>
        <span>{{ video.likes }}</span>
        <v-spacer></v-spacer>
        <span>{{ video.view }} 次观看</span>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>

    <v-divider class="mt-4"></v-divider>

    <div class="videos-view-content">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <p class="title">
            上传教师：
            </p>
            <p class="subheading">
              {{ video.teacherName }}
            </p>
            <br>
            <p class="title">视频描述：</p>
            <p class="subheading">
              {{ video.description }}
            </p>
            <br>
            <p class="title">标签：</p>
            <p class="subheading">
              <v-chip color="teal" text-color="white">
                <v-avatar>
                  <v-icon>code</v-icon>
                </v-avatar>
                {{ video.tag }}
              </v-chip>
            </p>
            <br>
          </v-flex>
          <v-flex xs12 md6>
            <v-toolbar color="light-blue darken-3">
              <v-icon>video_library</v-icon>
              <v-toolbar-title style="color:white">该教师的全部视频</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card class="video-list">
              <v-list two-line>
                <template v-for="(item, index) in allVideos">
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
                        <v-btn color="orange" @click="view(item.videoId, item.teacherName)">
                          <span style="color:white;">观看</span>
                        </v-btn>
                      </v-list-tile-action-text>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider v-if="index + 1 < allVideos.length" :key="index"></v-divider>
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
import { httpGet, httpPut } from '@/utils/api'

export default {
  name: 'videos-view',
  data() {
    return {
      video: {},
      allVideos: [],
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
      httpGet(`/students/getVideos/${this.id}?teacherName=${this.teacherName}`).then((response) => {
        this.video = response.data.items.currentVideo
        this.allVideos = response.data.items.restVideos
      })
    },
    view(id, teacherName) {
      this.$router.push({
        path: `/videosView/${id}`,
        query: {
          teacher: teacherName,
        },
      })
      this.loadData()
    },
    like() {
      httpPut(`/students/likesVideo/${this.id}?teacherName=${this.teacherName}`).then(() => {
        this.video.likes += 1
      })
    },
  },
  created() {
    this.loadData()
  },
}
</script>


<style lang="scss">
.videos-view {
  #video-view-player {
    width: 100%;
    height: 500px;
  }
  .title {
    margin: 20px 0 30px 0;
  }
  .videos-view-content {
    margin: 40px 0 20px 0;
  }
  .video-list {
    height: 400px !important;
    overflow: scroll;
  }
}
</style>
