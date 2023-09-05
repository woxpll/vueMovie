<template>
  <div id="app">
    <PosterBg :poster="posterBg"/>
    <MoviesList :list="moviesList" @changePoster="onChangePoster"/>
    <MoviePagination
        :current-page="currentPage"
        :per-page="moviesPerPages"
        :total="moviesLength"
        @pageChanged="onPageChanged"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MoviesList from "@/components/MoviesList.vue";
import PosterBg from "@/components/PosterBg.vue";
import MoviePagination from "@/components/MoviePagination.vue";
export default {
  name: "App",
  components: {
    MoviesList,
    PosterBg,
    MoviePagination
  },
  data: () => ({
    posterBg: ""
  }),
  computed: {
    ...mapGetters("moviesStore", ["moviesList", "currentPage", "moviesPerPages", "moviesLength"])
  },
  watch: {
    "$route.query": {
      handler: "onPageQueryChanged",
      immediate: true,
      deep: true
    }
  },
  mounted() {
    // this.fetchMovies()
  },
  methods: {
    ...mapActions("moviesStore", ["changeCurrentPage"]),
    onPageQueryChanged({ page = 1 } = {}){
      this.changeCurrentPage(Number(page))
    },
    onChangePoster(poster){
      this.posterBg = poster
    },
    onPageChanged(page){
      this.$router.push({ query: {page}})
      // this.changeCurrentPage(page)
    }
  },
  // created() {
  //   // if(this.$route.query.page){
  //   //   this.changeCurrentPage(Number(this.$route.query.page))
  //   // }
  // }
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
</style>
