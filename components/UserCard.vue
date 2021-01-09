<template>
  <v-card class="ma-2" dark width="200px">
    <v-card-title>{{ data.login }}</v-card-title>
    <v-img
      class="shrink ma-2"
      contain
      height="150px"
      :src="data.avatar_url"
      style="flex-basis: 150px"
    ></v-img>
    <v-card-actions>
      <v-btn text color="teal accent-4" @click="github()"> GitHub </v-btn>
      <v-spacer />
      <v-btn text color="teal accent-4" :to="'detail?id=' + data.login">
        Detail
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    github() {
      window.open(this.data.html_url, '_blank')
    },
  },
}
</script>
