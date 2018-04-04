<template>
  <div class="like-best-view">
    <tab-list
      title="点赞最多"
      :videoList="videoList"
      :docsList="docsList"
      :PPTList="PPTList"
      icon="fab fa-gratipay">
    </tab-list>
  </div>
</template>


<script>
import { httpGet } from '@/utils/api'
import TabList from '@/components/common/TabList'

export default {
  name: 'like-best-view',
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
