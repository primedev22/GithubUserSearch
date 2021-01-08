<template>
  <v-container>
    <v-row class="mt-5">
      <v-img max-height="250" max-width="250" :src="data.avatar_url"></v-img>
      <v-col class="ml-5">
        <v-row class="mt-2">
          <span class="text-h4 font-weight-bold">{{ data.name }}</span>
        </v-row>
        <v-row class="text-body-1 my-5">
          {{ data.bio }}
        </v-row>
        <v-row class="my-1">
          <v-icon class="mr-2" color="green">mdi-account-multiple</v-icon>
          {{ data.company }}
        </v-row>
        <v-row class="my-1">
          <v-icon class="mr-2" color="green">mdi-link</v-icon>
          <a :href="data.blog" target="_blank">{{ data.blog }}</a>
        </v-row>
        <v-row class="my-1">
          <v-icon class="mr-2" color="green">mdi-map-marker</v-icon>
          {{ data.location }}
        </v-row>
        <v-row>
          <div class="text-center mt-3 mr-3">
            <span class="text-h4">{{ data.followers }}</span
            ><br />
            <span>Followers</span>
          </div>
          <div class="text-center mt-3 mr-3">
            <span class="text-h4">{{ data.following }}</span
            ><br />
            <span>Following</span>
          </div>
          <div class="text-center mt-3 mr-3">
            <span class="text-h4">{{ data.public_repos }}</span
            ><br />
            <span>Repos</span>
          </div>
          <div class="text-center mt-3 mr-3">
            <span class="text-h4">{{ data.public_gists }}</span
            ><br />
            <span>Gists</span>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      data: {},
    }
  },
  mounted() {
    this.loading = true
    fetch(`https://api.github.com/users/${this.$route.query.id}`, {
      headers: {
        Authorization: `Basic ${process.env.NUXT_ENV_AUTH_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        this.loading = false
        this.data = resJson
      })
      .catch(() => {
        this.loading = false
      })
  },
}
</script>
