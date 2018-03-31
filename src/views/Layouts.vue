<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer fixed clipped v-model="drawer" app>
      <v-list dense>
        <v-subheader class="mt-3 grey--text text--darken-1">该平台资源</v-subheader>
        <v-list-tile v-for="item in items" :key="item.text" @click="save">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
          <v-btn>查看更多资源</v-btn>

        <v-subheader class="mt-3 grey--text text--darken-1">该平台教师</v-subheader>
        <v-list>
          <v-list-tile v-for="item in items2" :key="item.text" avatar @click="save">
            <v-list-tile-avatar>
              <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt="">
            </v-list-tile-avatar>
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
          </v-list-tile>
          <v-btn>查看更多教师</v-btn>
        </v-list>
        <v-list-tile class="mt-3" @click="save">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="save">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">
            Manage Subscriptions
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="red" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <i style="padding-left:20px" class="material-icons">video_library</i>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title" style="margin:10px">易学</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 450px">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb="() => {}"
          color="white"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-container app>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
export default {
  name: 'layouts-view',
  data() {
    return {
      drawer: true,
      items: [
        { icon: 'trending_up', text: '最受欢迎' },
        { icon: 'subscriptions', text: '最新上传' },
        { icon: 'whatshot', text: '点赞最多' },
        { icon: 'share', text: '全部分享' },
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
    }
  },
  methods: {
    save() {
      console.log('123')
    },
  },
}
</script>


<style lang="scss">
</style>
