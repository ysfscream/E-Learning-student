<template>
  <div class="all-shares-view">
    <tab-list
      title="全部分享"
      :hasTabs="false"
      icon="fas fa-share">
    </tab-list>
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
</template>


<script>
import { httpGet } from '@/utils/api'
import TabList from '@/components/common/TabList'

export default {
  name: 'all-shares-view',
  components: {
    TabList,
  },
  data() {
    return {
      shareList: [],
    }
  },
  methods: {
    loadData() {
      httpGet('/platform/getShares').then((response) => {
        this.shareList = response.data.items.shareList
      })
    },
    target(link) {
      const aTag = document.createElement('a')
      aTag.href = link
      aTag.click()
    },
  },
  created() {
    this.loadData()
  },
}
</script>


<style lang="scss" scoped>
</style>
