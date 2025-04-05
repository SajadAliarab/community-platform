<template>
  <div>
    <!-- Toggle Button for Mobile View -->
    <button @click="toggleSidebar" aria-controls="separator-sidebar" type="button"
      class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
      <span class="sr-only">Open sidebar</span>
      <Icon name="i-heroicons-bars-3-20-solid" class="w-5  h-5" />
    </button>

    <!-- Sidebar -->
    <aside id="separator-sidebar" :class="[
      'fixed left-0 z-40 w-72 h-screen transition-transform bg-primary-200 dark:bg-gray-900',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'sm:translate-x-0'
    ]" aria-label="Sidebar">
      <div class="h-full px-3 py-4 overflow-y-auto ">
        <ul class="space-y-2 font-medium">
          <li>
            <ULink to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
              <Icon name="i-heroicons-home-20-solid"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3">Home</span>
            </ULink>
          </li>
          <li>
            <ULink to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
              <Icon name="i-heroicons-list-bullet-20-solid"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3">Feed</span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-3">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>


            </ULink>
          </li>
          <li>
            <UDivider label=" From Club " :ui="{ label: 'text-gray-500 dark:text-primary-400' }" />
          </li>
          <li>
            <ULink to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
              <Icon name="i-heroicons-calendar-days-20-solid"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3">Events</span> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-3">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            </ULink>
          </li>
          <li>
            <ULink to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
              <Icon name="i-heroicons-megaphone-20-solid"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3">Announcements</span><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-3">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            </ULink>
          </li>
          <li>
            <ULink to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
              <Icon name="i-heroicons-trophy-20-solid"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3">Match Centre</span><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-3">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            </ULink>
          </li>
          <li>
            <UDivider label=" Community " :ui="{ label: 'text-gray-500 dark:text-primary-400' }" />
          </li>
          <li>
            <ULink to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
              <Icon name="i-heroicons-user-group-20-solid"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3">Intro & Networking</span><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-3">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            </ULink>
          </li>
          <li>
            <ULink to="/categories"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
              <Icon name="i-heroicons-chat-bubble-left-right-20-solid"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3">Discuss With Community</span><svg width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="orange" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="ml-1">
                <path d="M12 2a10 10 0 1 0 10 10" />
              </svg>

            </ULink>
          </li>
          <li>
            <UDivider label=" Fan Content " :ui="{ label: 'text-gray-500 dark:text-primary-400' }" />
          </li>
          <li>
            <ULink to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
              <Icon name="i-heroicons-photo-20-solid"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3">Fan Galleries </span><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-3">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            </ULink>
          </li>
          <li>
            <ULink to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
              <Icon name="i-heroicons-newspaper-20-solid"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3">Fan Blogs</span><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-3">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            </ULink>
          </li>
          <li>
            <ULink to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
              <Icon name="i-heroicons-gift-20-solid"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3">Polls and Quizzes</span><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-3">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            </ULink>
          </li>
          <li>
            <UDivider label=" Admin Panel " :ui="{ label: 'text-gray-500 dark:text-primary-400' }" />
          </li>
          <li>
            <ULink to="https://coapi.sajad.uk"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
              <Icon name="i-heroicons-cog-20-solid"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3">Admin Panel</span><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-3"> 
                <path d="M20 6L9 17l-5-5" />
              </svg>

            </ULink>
          </li>
        </ul>


      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State for sidebar open/close
const sidebarOpen = ref(false)

// Function to toggle sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>