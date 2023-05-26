<template>
  <!-- Navigation Menu -->
  <NavigationMenu></NavigationMenu>
  <!-- Hero Section -->
  <router-view v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <!-- Footer -->
  <Footer></Footer>
  <button @click="scrollToTop" class="fixed bottom-6 right-6 bg-red-800 text-white rounded-full p-3 shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
    </svg>
  </button>
</template>

<script setup>
import NavigationMenu from '@/components/NavigationMenu.vue';
import Footer from '@/components/Footer.vue';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

</script>
