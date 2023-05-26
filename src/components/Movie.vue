<template>
	<router-link :to="{ name: 'Details', params: { id: movie.id } }">
		<div class="bg-gray-100 p-4 rounded shadow movie-card overflow-hidden transition hover:scale-105">
			<img :src="imageURL" alt="Movie Poster" class="mb-4 rounded transition hover:scale-150 sm:w-full">
			<h3 class="text-lg font-bold text-red-400">{{ movie.title }}</h3>
			<div class="mt-4">
				<p class="text-gray-700">
					<span class="font-bold">
						Rating: {{ (movie.vote_average.toFixed(1) * 10) }}%
					</span> -
					<span class="font-bold">
						{{ formattedReleaseDate }}
					</span>
				</p>
			</div>
			<router-link :to="{ name: 'Details', params: { id: movie.id } }"
				class="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
				Details
			</router-link>
		</div>
	</router-link>
</template>
  
<script setup>
import { computed } from 'vue';
import { fullImageURL } from '@/helpers';

const props = defineProps({
	movie: Object,
});

const imageURL = computed(() => {
	return fullImageURL(props.movie.poster_path);
});

const formattedReleaseDate = computed(() => {
	const date = new Date(props.movie.release_date);
	const options = { month: 'long', day: 'numeric', year: 'numeric' };
	return date.toLocaleDateString('en-US', options);
});
</script>
