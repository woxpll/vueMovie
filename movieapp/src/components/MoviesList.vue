<template>
  <BContainer>
    <h3 class="list-title"> IMDB Top 250</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem :movie="movie" @mouseover.native="onMouseOver(movie.Poster)"/>
        </BCol>
      </template>
      <template v-else>
        <div>Empty List</div>
      </template>
    </BRow>
  </BContainer>
</template>

<script>

import MovieItem from "@/components/MovieItem.vue";
export default {
  name: "MoviesList",
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    MovieItem
  },
  computed: {
    isExist() {
      return Boolean(Object.keys(this.list).length)
    }
  },
  methods: {
    onMouseOver(poster){
      this.$emit("changePoster", poster)
    }
  }
}
</script>

<style scoped>

.list-title{
  font-size: 50px;
  margin-bottom: 30px;
  color: #ffffff;
}

</style>