<template>
  <div class="home-view">
    <v-jumbotron color="lighten-2" height="300">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h2 class="display-2">欢迎来到，易学平台</h2>
            <br>
            <span class="subheading" style="margin-bottom:20px">
              易学，是一个集视频、课件、文档、分享为主的在线学习教育平台。
              易学，"E-Learning" 让一切学习都很容易。
            </span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

    <v-carousel class="p-5">
      <v-carousel-item v-for="(item,i) in slideshows" :src="item.img" :key="i">
      </v-carousel-item>
    </v-carousel>

    <div class="content-list">
      <v-subheader class="headline">
        向您推荐
      </v-subheader>
      <v-divider class="my-3"></v-divider>
      <v-subheader class="subheading">
        视频
      </v-subheader>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="(video, index) in videoList" :key="index" xs12 md4>
            <v-card>
              <div class="video-media">
                <video :src="video.video" style="max-width:100%;"></video>
              </div>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ video.title }}</h3>
                  <div>{{ video.description }}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn
                  color="orange"
                  @click="$router.push({
                    path: `/videosView/${video.videoId}`,
                    query: { teacher: video.teacherName } })">
                  观看
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>favorite</v-icon>
                </v-btn>
                <span>{{ video.likes }}</span>
                <v-icon>remove_red_eye</v-icon>
                <span>{{ video.view }}</span>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-subheader class="subheading">
        文档
      </v-subheader>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="(doc, index) in docsList" :key="index" xs12 md4>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">{{ doc.title }}</div>
              </v-card-title>
              <div style="padding:0 0 10px 10px;">{{ doc.description }}</div>
              <v-card-actions>
                <v-btn
                  color="green"
                  @click="$router.push({
                    path: `/docsView/${doc.docsId}`,
                    query: { teacher: doc.teacherName } })">
                  阅读
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon color="white">favorite</v-icon>
                </v-btn>
                <span>{{ doc.likes }}</span>
                <v-icon color="white">remove_red_eye</v-icon>
                <span>{{ doc.view }}</span>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-subheader class="subheading">
        课件
      </v-subheader>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="(ppt, index) in PPTList" :key="index" xs12 md4>
            <v-card color="cyan darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">{{ ppt.title }}</div>
              </v-card-title>
              <div style="padding:0 0 10px 10px;">{{ ppt.description }}</div>
              <v-card-actions>
                <v-btn color="blue" @click="download(ppt.ppt)">下载</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon color="white">favorite</v-icon>
                </v-btn>
                <span>{{ ppt.likes }}</span>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-subheader class="subheading">
        分享
      </v-subheader>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 md12>
            <v-card color="deep-purple">
              <v-list two-line>
                <template v-for="(item, index) in shareList">
                  <v-list-tile
                    avatar
                    ripple
                    :key="item.title">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.shareTitle }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-list-tile-action-text>
                        <v-btn color="indigo" @click="target(item.shareLink)">
                          <span style="color:white;">点此跳转</span>
                        </v-btn>
                      </v-list-tile-action-text>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider v-if="index + 1 < shareList.length" :key="index"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>


<script>
import { httpGet } from '../utils/api'

export default {
  name: 'home-view',
  data() {
    return {
      videoList: [],
      docsList: [],
      PPTList: [],
      shareList: [],
      slideshows: [],
    }
  },
  methods: {
    loadSilidshows() {
      httpGet('/home/getSlideshow').then((response) => {
        this.slideshows = response.data.items
      })
    },
    loadRecommend() {
      httpGet('/home/getRecommend').then((response) => {
        this.videoList = response.data.items.recommend.videos
        this.docsList = response.data.items.recommend.docs
        this.PPTList = response.data.items.recommend.PPTs
        this.shareList = response.data.items.recommend.shares
      })
    },
    target(link) {
      const aTag = document.createElement('a')
      aTag.href = link
      aTag.click()
    },
    download(link) {
      const aTag = document.createElement('a')
      aTag.href = link
      aTag.target = '_blank'
      aTag.click()
    },
  },
  created() {
    this.loadRecommend()
    this.loadSilidshows()
  },
}
</script>


<style lang="scss">
.home-view {
  .carousel {
    height: 430px;
    margin-bottom: 20px;
    img {
      height: 140%;
    }
  }
}
</style>
