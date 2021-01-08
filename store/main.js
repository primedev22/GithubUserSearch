export const state = () => ({
  keyword: '',
  page: 1,
  itemsPerPage: 10,
})

export const getters = {}

export const actions = {
  async getItems({ commit }, data) {
    try {
      commit('setFilter', data)
      const res = await fetch(
        `https://api.github.com/search/users?q=${data.keyword}&page=${data.page}&per_page=${data.itemsPerPage}`,
        {
          headers: {
            Authorization: `Basic ${process.env.NUXT_ENV_AUTH_TOKEN}`,
          },
        }
      )
      const resJson = await res.json()
      return {
        success: true,
        totalCount: resJson.total_count,
        items: resJson.items,
      }
    } catch (err) {
      return { success: false }
    }
  },
}

export const mutations = {
  setFilter(state, data) {
    state.keyword = data.keyword
    state.page = data.page
    state.itemsPerPage = data.itemsPerPage
  },
}
