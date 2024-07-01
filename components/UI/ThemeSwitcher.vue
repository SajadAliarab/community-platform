<template>
    <div class="px-5">
      <UToggle
        on-icon="i-heroicons-sun-20-solid"
        off-icon="i-heroicons-moon-20-solid"
        color="gray"
        v-model="isDark"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  
  // Dark mode state
  const isDark = ref(true)
  
  
  // Function to update the theme
  const updateTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('nuxt-color-mode', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('nuxt-color-mode', 'light')
    }
  }


  
  // Watch for changes in dark mode state and update the theme
  watch(isDark, updateTheme)
  </script>
  