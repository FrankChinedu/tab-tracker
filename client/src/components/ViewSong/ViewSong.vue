<template>
  <div>
    <v-layout class="mb-3">
      <v-flex xs6>
        <song-metadata :song="song" />
      </v-flex>
      <v-flex xs6 class="ml-2">
      <you-tube :youtubeId="song.youtubeId"/>
      </v-flex>
    </v-layout>

    <v-layout class="mt-2">
      <v-flex xs6 >
        <tab :tab="song.tab"/>
      </v-flex>

      <v-flex xs6 class="ml-2 ">
        <lyrics :lyrics="song.lyrics"/>
      </v-flex>
    </v-layout>
</div>
</template>

<script>
import SongMetadata from './SongMetadata'
import Lyrics from './Lyrics'
import Tab from './Tab'
import YouTube from './YouTube'
import SongsServices from '@/services/SongsServices'
import Panel from '@/components/Panel'

export default {
  components: {
    Panel,
    SongMetadata,
    YouTube,
    Lyrics,
    Tab
  },
  data () {
    return {
      song: null
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsServices.show(songId)).data
  }
}
</script>

<style scoped>

</style>
