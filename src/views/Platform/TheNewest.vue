<template>
  <div class="the-newest-view">
    <tab-list
      title="最新上传"
      :videoList="videoList"
      :docsList="docsList"
      :PPTList="PPTList"
      icon="fas fa-shipping-fast">
    </tab-list>
  </div>
</template>


<script>
import { httpGet } from '@/utils/api'
import TabList from '@/components/common/TabList'

export default {
  name: 'the-newest-view',
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
