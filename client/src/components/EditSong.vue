<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <v-text-field
          label="Title"
          v-model="song.title"
          required
          :rules="[required]"
          ></v-text-field>

          <v-text-field
          label="Artist"
          v-model="song.artist"
          required
          :rules="[required]"
          ></v-text-field>

          <v-text-field
          label="Genre"
          v-model="song.genre"
          required
          :rules="[required]"
          ></v-text-field>

          <v-text-field
          label="Album"
          v-model="song.album"
          required
          :rules="[required]"
          ></v-text-field>

          <v-text-field
          label="Album Image Url"
          v-model="song.albumImageUrl"
          required
          :rules="[required]"
          ></v-text-field>

          <v-text-field
          label="Youtube ID"
          v-model="song.youtubeId"
          required
          :rules="[required]"
          ></v-text-field>
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
        <v-text-field
        label="Tab"
        multi-line
        v-model="song.tab"
        required
        :rules="[required]">
        </v-text-field>

        <v-text-field
        label="Lyrics"
        multi-line
        v-model="song.lyrics"
        required
        :rules="[required]">
      </v-text-field>
      </panel>
      <span class="error" v-if="error">
        {{error}}
      </span>
      <v-btn class="cyan" @click="save">Edit Song</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsServices from '@/services/SongsServices'
import Panel from '@/components/Panel'

export default {
  components: {
    Panel
  },
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      required: (value) => !!value || 'Required.',
      error: null
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsServices.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])

      if (!areAllFieldsFilledIn) {
        this.error = 'please fill in all required fields'
        return
      }
      const songId = this.$store.state.route.params.songId

      try {
        await SongsServices.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
