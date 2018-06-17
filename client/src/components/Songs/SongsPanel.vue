<template>
  <panel title="Songs">
    <div slot="action">
      <router-link :to="{name: 'songs-create'}">
        <v-btn class="cyan accent-2"
        fab
        absolute
        right
        light>
          <v-icon>add</v-icon>
        </v-btn>
      </router-link>
    </div>
    <div v-for="song in songs" :key="song.id" class="song">
      <v-layout>
        <v-flex xs6>
          <div class="song-title">
            {{song.title}}
          </div>
          <div class="song-artist">
            {{song.artist}}
          </div>
          <div class="song-genre">
            {{song.genre}}
          </div>
          <v-btn class="cyan" @click="navigateTo({
          name: 'song', params: {songId: song.id}
        })">view</v-btn>
        </v-flex>
        <v-flex xs6>
          <img class="album-image" :src="song.albumImageUrl" alt="">
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import SongsServices from '@/services/SongsServices'

export default {
  data () {
    return {
      songs: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsServices.index(value)).data
      }
    }
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 18px;
}

.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
