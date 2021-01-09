<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row class="mt-5">
      <v-img max-height="250" max-width="250" :src="profile.avatar_url"></v-img>
      <v-col class="ml-5">
        <v-row class="mt-2">
          <span class="text-h4 font-weight-bold">{{ profile.name }}</span>
        </v-row>
        <v-row class="text-body-1 my-5">
          {{ profile.bio }}
        </v-row>
        <v-row v-if="profile.company" class="my-1">
          <v-icon class="mr-2" color="green">mdi-account-multiple</v-icon>
          {{ profile.company }}
        </v-row>
        <v-row v-if="profile.blog" class="my-1">
          <v-icon class="mr-2" color="green">mdi-link</v-icon>
          <a :href="profile.blog" target="_blank">{{ profile.blog }}</a>
        </v-row>
        <v-row v-if="profile.location" class="my-1">
          <v-icon class="mr-2" color="green">mdi-map-marker</v-icon>
          {{ profile.location }}
        </v-row>
        <v-row>
          <div class="text-center mt-3 mr-3">
            <span class="text-h4">{{ profile.followers }}</span
            ><br />
            <span>Followers</span>
          </div>
          <div class="text-center mt-3 mr-3">
            <span class="text-h4">{{ profile.following }}</span
            ><br />
            <span>Following</span>
          </div>
          <div class="text-center mt-3 mr-3">
            <span class="text-h4">{{ profile.public_repos }}</span
            ><br />
            <span>Repos</span>
          </div>
          <div class="text-center mt-3 mr-3">
            <span class="text-h4">{{ profile.public_gists }}</span
            ><br />
            <span>Gists</span>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="12"><span class="text-h5">Repositories</span></v-col>
      <RepoCard v-for="item in profile.repos" :key="item.id" :data="item" />
    </v-row>
  </v-container>
</template>

<script>
import RepoCard from '~/components/RepoCard.vue'

export default {
  components: {
    RepoCard,
  },
  data() {
    return {
      loading: false,
      profile: {},
    }
  },
  async mounted() {
    this.loading = true
    const res = await this.$store.dispatch('main/getUser', {
      id: this.$route.query.id,
    })
    if (res.success) {
      this.profile = res.data
    }
    this.loading = false
  },
}
</script>
