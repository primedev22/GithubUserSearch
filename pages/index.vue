<template>
  <v-container fill-height>
    <v-overlay :value="loading"></v-overlay>
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
      <v-btn class="ma-2" outlined @click="updateItems()">Search</v-btn>
    </v-row>
    <v-row class="my-1">
      <span>{{ totalCount }} results found</span>
    </v-row>
    <v-row class="main-content">
      <Item v-for="item in items" :key="item.id" :data="item" />
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
import Item from '~/components/Item.vue'

export default {
  components: {
    Item,
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
      detailId: '',
      detailOpen: false,
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
    this.updateItems()
  },
  methods: {
    updatePage(number) {
      this.page = number
      this.updateItems()
    },
    updateItems() {
      if (!this.keyword) {
        this.items = []
        this.totalCount = 0
        return
      }
      this.loading = true
      fetch(
        `https://api.github.com/search/users?q=${this.keyword}&page=${this.page}&per_page=${this.itemsPerPage}`,
        {
          headers: {
            Authorization: `Basic ${process.env.NUXT_ENV_AUTH_TOKEN}`,
          },
        }
      )
        .then((res) => res.json())
        .then((resJson) => {
          this.loading = false
          if (resJson.total_count) {
            this.items = resJson.items
            this.totalCount = resJson.total_count
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    updateItemsPerPage(number) {
      this.page = 1
      this.itemsPerPage = number
      this.updateItems()
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
