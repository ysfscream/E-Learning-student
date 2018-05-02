<template>
  <div class="tab-list-view">
    <h2 class="display-5">
      {{ title }} <i :class="icon"></i>
    </h2>
    <br>
    <v-divider></v-divider>
    <br>
    <v-tabs
      v-if="hasTabs"
      color="grey darken-2"
      slot="extension"
      v-model="tab"
      grow>
      <v-tabs-slider></v-tabs-slider>
      <v-tab style="color:white" v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card flat class="list-content">
          <v-container v-if="item === '视频'" grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="(video, index) in videoList" :key="index" xs12 md4>
                <v-card class="list-content-card">
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
                    <v-icon>favorite</v-icon>
                    <span>{{ video.likes }}</span>
                    <v-icon>remove_red_eye</v-icon>
                    <span>{{ video.view }}</span>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-if="item === '文档'" grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="(doc, index) in docsList" :key="index" xs12 md4>
                <v-card color="blue-grey darken-2" class="white--text list-content-card">
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
                    <v-icon color="white">favorite</v-icon>
                    <span>{{ doc.likes }}</span>
                    <v-icon color="white">remove_red_eye</v-icon>
                    <span>{{ doc.view }}</span>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-if="item === '课件'" grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="(ppt, index) in PPTList" :key="index" xs12 md4>
                <v-card color="cyan darken-2" class="white--text list-content-card">
                  <v-card-title primary-title>
                    <div class="headline">{{ ppt.title }}</div>
                  </v-card-title>
                  <div style="padding:0 0 10px 10px;">{{ ppt.description }}</div>
                  <v-card-actions>
                    <v-btn color="blue" @click="download(ppt.ppt)">下载</v-btn>
                    <v-spacer></v-spacer>
                    <v-icon color="white">favorite</v-icon>
                    <span>{{ ppt.likes }}</span>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>


<script>
export default {
  name: 'tab-list-view',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    videoList: {
      type: Array,
      default: () => [],
    },
    docsList: {
      type: Array,
      default: () => [],
    },
    PPTList: {
      type: Array,
      default: () => [],
    },
    hasTabs: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tab: null,
      items: [
        '视频', '文档', '课件',
      ],
      text: '123',
    }
  },
  methods: {
    download(link) {
      const aTag = document.createElement('a')
      aTag.href = link
      aTag.target = '_blank'
      aTag.click()
    },
  },
}

</script>


<style lang="scss" scoped>
.tab-list-view {
  h2 {
    margin: 20px 0 0 0;
  }
  .tabs__container {
    height: 50px;
  }
  .list-content {
    background: transparent;
    .list-content-card {
      margin-top: 20px;
    }
  }
}
</style>
