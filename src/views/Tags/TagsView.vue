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
  watch: {
    title() {
      this.loadData()
    },
  },
  computed: {
    title() {
      return this.$route.params.tag
    },
  },
  methods: {
    loadData() {
      httpGet(`/platform/getTags/${this.title}`).then((response) => {
        this.videoList = response.data.items.tagList.videos
        this.docsList = response.data.items.tagList.docs
        this.PPTList = response.data.items.tagList.PPTs
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
