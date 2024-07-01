<template>
    <div class="bg-primary-50 dark:bg-gray-950 h-screen flex flex-col">
      <!-- Header -->
      <TheHeader class="sticky top-0 z-50" />
  
      <div :class="{ sidebarOpen:'top-20' , 'sm:top-34': !sidebarOpen}" class="flex flex-1 overflow-hidden">
        <!-- Sidebar -->
        <TheSideBar />
  
        <!-- Main Content -->
        <main :class="{ sidebarOpen:'ml-64' , 'sm:ml-64': !sidebarOpen}" class="flex-1 overflow-auto transition-transform mt-10">
          <slot></slot>
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import TheHeader from '~/components/UI/TheHeader.vue';
  import TheSideBar from '~/components/UI/TheSideBar.vue';
  import { ref } from 'vue';
  
  const sidebarOpen = ref(false);
  </script>