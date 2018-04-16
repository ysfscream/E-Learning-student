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
    loadData() {
      httpGet('/platform/getLikes').then((response) => {
        this.videoList = response.data.items.likesList.videoList
        this.docsList = response.data.items.likesList.docsList
        this.PPTList = response.data.items.likesList.PPTList
      })
    },
  },
  created() {
    this.loadData()
  },
}
</script>


<style lang="scss" scoped>
</style>
