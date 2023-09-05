import IDs from "@/store/mock/imdb.top250"
import axios from "@/plugins/axios";
import mutations from "@/store/mutations";
function serializeResponce(movies) {
    return movies.reduce((acc, item) => {
        acc[item.imdbID] = item
        return acc
    }, {})
}

const { MOVIES, CURRENT_PAGE } = mutations

const moviesStore = {
    namespaced: true,
    state: {
        top250IDs: IDs,
        moviesPerPages: 12,
        currentPage: 1,
        movies: {}
    },
    getters: {
        moviesList: ({movies}) => movies,
        sliceIDs: ({top250IDs}) => (from, to) => top250IDs.slice(from, to),
        currentPage: ({currentPage}) => currentPage,
        moviesPerPages: ({moviesPerPages}) => moviesPerPages,
        moviesLength: ({top250IDs}) => Object.keys(top250IDs).length
    },
    mutations: {
        [MOVIES](state, value){
            state.movies = value
        },
        [CURRENT_PAGE](state, value){
            state.currentPage = value
        },
    },
    actions: {
        initMoviesStore: {
            handler({ dispatch }) {
                dispatch("fetchMovies")
            },
            root: true
        },
        async fetchMovies({ getters, commit }){
            try {
                const { currentPage, moviesPerPages, sliceIDs } = getters
                const from = (currentPage * moviesPerPages) - moviesPerPages
                const to = currentPage * moviesPerPages
                const moviesToFetch = sliceIDs(from, to)

                const requests = moviesToFetch.map((id) => axios.get(`/?i=${id}`))
                const responce = await Promise.all(requests)

                const movies = serializeResponce(responce)
                commit(MOVIES, movies)
                console.log(movies)
            }catch (e){
                console.log(e)
            }
        },
        changeCurrentPage({commit, dispatch}, page){
            commit(CURRENT_PAGE, page)
            dispatch("fetchMovies")
        }
    }
}

export default moviesStore