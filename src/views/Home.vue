<template>
  <div class="home-view">
    <v-carousel class="p-5">
      <v-carousel-item v-for="(item,i) in slideshows" :src="item.img" :key="i">
      </v-carousel-item>
    </v-carousel>
  </div>
</template>


<script>
import { httpGet } from '../utils/api'

export default {
  name: 'home-view',
  data() {
    return {
      slideshows: [],
    }
  },
  methods: {
    loadData() {
      httpGet('/slideshows/getSlideshow').then((response) => {
        this.slideshows = response.data.items
      })
    },
  },
  created() {
    this.loadData()
  },
}
</script>


<style lang="scss">
.home-view {
  .carousel {
    height: 450px;
    img {
      height: 110%;
    }
  }
}
</style>
