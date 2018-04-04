<template>
  <div class="most-popular-view">
    <tab-list
      title="最受欢迎"
      :videoList="videoList"
      :docsList="docsList"
      :PPTList="PPTList"
      icon="fas fa-sort-amount-up">
    </tab-list>
  </div>
</template>


<script>
import { httpGet } from '@/utils/api'
import TabList from '@/components/common/TabList'

export default {
  name: 'most-popular-view',
  components: {
    TabList,
  },
  data() {
    return {
      videoList: [],
      docsList: [],
      PPTList: [],
    }
  },
  methods: {
    loadRecommend() {
      httpGet('/home/getRecommend').then((response) => {
        this.videoList = response.data.items.recommend.videos
        this.docsList = response.data.items.recommend.docs
        this.PPTList = response.data.items.recommend.PPTs
      })
    },
  },
  created() {
    this.loadRecommend()
  },
}
</script>


<style lang="scss" scoped>
</style>
