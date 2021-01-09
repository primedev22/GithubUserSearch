const fetchData = async (url) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${process.env.NUXT_ENV_AUTH_TOKEN}`,
    },
  })
  const resJson = await res.json()
  return resJson
}

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
      const res = await fetchData(
        `https://api.github.com/search/users?q=${data.keyword}&page=${data.page}&per_page=${data.itemsPerPage}`
      )
      return {
        success: true,
        totalCount: res.total_count,
        items: res.items,
      }
    } catch (err) {
      return { success: false }
    }
  },
  async getUser(_, data) {
    try {
      const profile = await fetchData(`https://api.github.com/users/${data.id}`)
      const repos = await fetchData(profile.repos_url)

      return {
        success: true,
        data: { ...profile, repos },
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
