<template>
  <div class="videos-view">
    <div class="title"><v-icon>shop</v-icon> 观看视频 </div>

    <v-divider class="mb-4"></v-divider>

    <v-card>
      <video
        id="video-view-player"
        class="video-js"
        controls
        preload="auto"
        data-setup='{}'>
        <source src="http://localhost:3333/public/uploads/video/1522637391776.mp4" type="video/mp4">
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="http://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class=".headline">React(1)</div>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>favorite</v-icon>
        </v-btn>
        <span>123</span>
        <v-spacer></v-spacer>
        <span>100 次观看</span>
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
              Yushifan
            </p>
            <br>
            <p class="title">视频描述：</p>
            <p class="subheading">
              React的第一步，如何搭建 react 的开发环境。
            </p>
            <br>
            <p class="title">标签：</p>
            <p class="subheading">
              <v-chip color="teal" text-color="white">
                <v-avatar>
                  <v-icon>code</v-icon>
                </v-avatar>
                JavaScript
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
                        <v-btn color="orange">
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
import { httpGet } from '@/utils/api'

export default {
  name: 'videos-view',
  data() {
    return {
      video: {},
      allVideos: [
        { title: 'HTML', description: '如何利用 HTML 制作 Tabs' },
        { title: 'JS 正则表达式', description: '听到正则就害怕？轻松学会正则表达式' },
      ],
      filename: '1522636521704.pdf',
    }
  },
  // computed: {
  //   filename() {
  //     const url = this.$route.query.url.split('/')
  //     return url[url.length - 1]
  //   },
  // },
  methods: {
    loadData() {
      httpGet('getDocs/')
    },
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
