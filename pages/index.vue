<template>
  <v-container fill-height>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row class="my-2">
      <v-text-field
        v-model="keyword"
        clearable
        flat
        solo
        hide-details
        prepend-inner-icon="mdi-account-search"
        label="Search GitHub"
      ></v-text-field>
      <v-btn class="ma-2" outlined @click="search()">Search</v-btn>
    </v-row>
    <v-row class="my-1">
      <span>{{ totalCount }} results found</span>
    </v-row>
    <v-row class="main-content">
      <UserCard v-for="item in items" :key="item.id" :data="item" />
    </v-row>
    <v-row class="mt-2" align="center" justify="center">
      <span>Items per page</span>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark text class="ml-2" v-bind="attrs" v-on="on">
            {{ itemsPerPage }}
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(number, index) in itemsPerPageArray"
            :key="index"
            @click="updateItemsPerPage(number)"
          >
            <v-list-item-title>{{ number }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>

      <v-pagination
        v-model="page"
        :length="numberOfPages"
        :total-visible="7"
        @input="updatePage"
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
import UserCard from '~/components/UserCard.vue'

export default {
  components: {
    UserCard,
  },
  data() {
    return {
      loading: false,
      keyword: '',
      page: 1,
      items: [],
      totalCount: 0,
      itemsPerPage: 10,
      itemsPerPageArray: [5, 10, 25, 50],
    }
  },
  computed: {
    numberOfPages() {
      // Maximum search limit is 1000 in GitHub
      return this.totalCount > 1000
        ? Math.ceil(1000 / this.itemsPerPage)
        : Math.ceil(this.totalCount / this.itemsPerPage)
    },
  },
  mounted() {
    this.keyword = this.$store.state.main.keyword
    this.page = this.$store.state.main.page
    this.itemsPerPage = this.$store.state.main.itemsPerPage
    this.updateItems()
  },
  methods: {
    updatePage(number) {
      this.page = number
      this.updateItems()
    },
    updateItemsPerPage(number) {
      this.page = 1
      this.itemsPerPage = number
      this.updateItems()
    },
    search() {
      this.page = 1
      this.updateItems()
    },
    async updateItems() {
      if (!this.keyword) {
        this.items = []
        this.totalCount = 0
        return
      }
      this.loading = true
      const data = await this.$store.dispatch('main/getItems', {
        keyword: this.keyword,
        page: this.page,
        itemsPerPage: this.itemsPerPage,
      })
      if (data.success) {
        this.totalCount = data.totalCount
        this.items = data.items
      }
      this.loading = false
    },
  },
}
</script>
<style scoped>
.main-content {
  height: calc(100vh - 300px);
  max-height: calc(100vh - 300px);
  overflow: scroll;
}
</style>
