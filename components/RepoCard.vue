<template>
  <v-card class="ma-2" dark width="100%">
    <v-card-title
      ><a :href="data.html_url" target="_blank">{{
        data.name
      }}</a></v-card-title
    >
    <v-card-text>
      {{ data.description }}
    </v-card-text>
    <v-card-actions>
      <v-icon class="ml-2 mr-1" color="pink">mdi-star</v-icon>
      {{ data.stargazers_count }}
      <v-icon class="ml-2 mr-1" color="green">mdi-source-fork</v-icon>
      {{ data.forks_count }}
      <v-icon class="ml-2 mr-1" color="green">mdi-eye</v-icon>
      {{ data.watchers_count }}
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['data'],
}
</script>
