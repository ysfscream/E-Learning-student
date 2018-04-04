<template>
  <div class="tags-view">
    <tab-list
      :title="title"
      :videoList="videoList"
      :docsList="docsList"
      :PPTList="PPTList">
    </tab-list>
  </div>
</template>


<script>
import { httpGet } from '@/utils/api'
import TabList from '@/components/common/TabList'

export default {
  name: 'tags-view',
  components: {
    TabList,
  },
  data() {
    return {
      videoList: [],
      docsList: [],
      PPTList: [],
      icon: '',
    }
  },
  computed: {
    title() {
      return this.$route.params.tag
    },
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
