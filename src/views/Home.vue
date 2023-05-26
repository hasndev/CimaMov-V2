<template>
	<div>
		<!-- Hero Section -->
		<div class="bg-red-800 py-20 text-white">
			<div class="container mx-auto px-4 text-center">
				<h1 class="text-4xl font-bold mb-4">Welcome To CimaMov</h1>
				<p class="text-lg">Millions of movies, TV shows and people to discover. Explore now.</p>
				<div class="mt-8 relative">
					<input type="text" placeholder="Search movies"
						class="text-center max-w-4xl w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:border-red-600"
						v-model="searchQuery" @input="searchMoviesDebounced" @blur="handleBlur">
					<div class="flex justify-center gap-4 mt-4">
						<button @click="timeWindow = 'week'" class="bg-gray-800 rounded-lg px-2 py-1 shadow-dark-50"
							:class="{ 'bg-rose-700': timeWindow === 'week' }">
							Week
						</button>
						<button @click="timeWindow = 'day'" class="bg-gray-800 rounded-lg px-2 py-1"
							:class="{ 'bg-rose-700': timeWindow === 'day' }">
							Day
						</button>
					</div>
					<div class="flex flex-col items-center">
						<transition name="slide-fade">
							<div v-if="isSearching"
								class="text-start absolute mt-2 max-w-4xl w-full p-2 rounded-lg z-10 bg-gray-800 overflow-y-scroll scrollbar-hide scr max-h-[60vh] ">
								<div v-if="searchResults == null">
									<h2>Loading...</h2>
								</div>
								<transition-group name="slide-fade">
									<div v-for="movie in searchResults" :key="`movie-${movie.id}`">
										<router-link :to="{ name: 'Details', params: { id: movie.id } }">
											<div class="flex mb-2 hover:bg-rose-800 rounded transition cursor-pointer">
												<img class="w-1/5 rounded" :src="fullImageURL(movie.backdrop_path)" alt="">
												<div class="flex ms-2 flex-col justify-center">
													<h3 class="text-xl font-bold">{{ movie.title }}</h3>
													<p class="text-White-700">
														<span>
															Vote:
															{{ (movie.vote_average.toFixed(1) * 10) }}%
														</span> -
														<span>
															{{ movie.release_date }}
														</span>
													</p>
												</div>
											</div>
										</router-link>
									</div>
									<div v-if="searchResults != null && searchResults.length === 0"
										class="flex flex-col items-start">
										<div class="flex mb-2 hover:bg-rose-800 rounded transition cursor-pointer">
											<h2>No Results</h2>
										</div>
									</div>
								</transition-group>
							</div>
						</transition>
					</div>
				</div>
			</div>
		</div>

		<!-- Movie Section -->
		<div class="bg-gray-900 py-16">
			<div class="container mx-auto px-4">
				<h2 class="text-3xl font-bold mb-8 text-center text-red">Trending</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
					<Movie v-for="movie in movies" :movie="movie" :key="movie.id"></Movie>
				</div>
			</div>
		</div>

		<!-- Movie Section -->
		<div class="bg-gray-900 py-16">
			<div class="container mx-auto px-4">
				<h2 class="text-3xl font-bold mb-8 text-center text-red">Top Rated</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
					<Movie v-for="movie in moviesPopular" :movie="movie" :key="movie.id"></Movie>
				</div>
			</div>
		</div>
	</div>
</template>
  
<script setup>
import Movie from "@/components/Movie.vue";

import axios from "@/http";
import { fullImageURL } from "@/helpers";
import { ref, onMounted, computed, watch } from "vue";
import { debounce } from "lodash";

const movies = ref([]);
const moviesPopular = ref([]);
const searchQuery = ref('');
const searchResults = ref([]);
const timeWindow = ref('week');

const isSearching = computed(() => {
	return searchQuery.value !== '';
});

const handleBlur = () => {
	searchResults.value = [];
	searchQuery.value = '';
};

const fetchMovies = async () => {
	const { data } = await axios.get(`/trending/movie/${timeWindow.value}`);
	movies.value = data.results.slice(0, 8);
};

const searchMovies = async () => {
	if (searchQuery.value !== '') {
		const { data } = await axios.get('search/movie', {
			params: {
				query: searchQuery.value
			}
		});
		searchResults.value = data.results;
	} else {
		searchResults.value = [];
	}
};

const searchMoviesDebounced = debounce(searchMovies, 200);

const fetchMoviesPopular = async () => {
	const { data } = await axios.get('movie/top_rated');
	moviesPopular.value = data.results;
};
onMounted(() => {
	fetchMovies();
	fetchMoviesPopular();
});

watch(searchQuery, () => {
	searchMoviesDebounced();
});

watch(timeWindow, () => {
	fetchMovies();
});
</script>
  
