<template>
    <div>
      <!-- Toggle Button for Mobile View -->
      <button
        @click="toggleSidebar"
        aria-controls="separator-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <Icon name="i-heroicons-bars-3-20-solid" class="w-5  h-5" />
      </button>
  
      <!-- Sidebar -->
      <aside
        id="separator-sidebar"
        :class="[
          'fixed left-0 z-40 w-64 h-screen transition-transform bg-primary-200 dark:bg-gray-900',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'sm:translate-x-0'
        ]"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto ">
          <ul class="space-y-2 font-medium">
            <li>
              <ULink to="/" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                <Icon name="i-heroicons-home-20-solid" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span class="ml-3">Home</span>
              </ULink>
            </li>
            <li>
              <ULink to="/feed" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                <Icon name="i-heroicons-list-bullet-20-solid" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span class="ml-3">Feed</span>
              </ULink>
            </li>
            <li>
              <UDivider 
              label=" From Retailer "
                :ui="{ label: 'text-gray-500 dark:text-primary-400' }"
                />
            </li>
            <li>
              <ULink to="/events" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                <Icon name="i-heroicons-calendar-days-20-solid" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span class="ml-3">Events</span>
              </ULink>
            </li>
            <li>
              <ULink to="/announcements" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                <Icon name="i-heroicons-megaphone-20-solid" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span class="ml-3">Announcements</span>
              </ULink>
            </li>
            <li>
                <ULink to="/announcements" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                <Icon name="i-heroicons-beaker-20-solid" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span class="ml-3">Knowledge Base</span>
              </ULink>
            </li>
            <li>
              <UDivider 
              label=" Community "
                :ui="{ label: 'text-gray-500 dark:text-primary-400' }"
                />
            </li>
            <li>
              <ULink to="/forums" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                <Icon name="i-heroicons-user-group-20-solid" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span class="ml-3">Intro & Networking</span>
              </ULink>
            </li>
            <li>
              <ULink to="/forums" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                <Icon name="i-heroicons-chat-bubble-left-right-20-solid" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span class="ml-3">Ask The Community</span>
              </ULink>
            </li>
            <li>
              <UDivider 
              label=" Products "
                :ui="{ label: 'text-gray-500 dark:text-primary-400' }"
                />
            </li>
            <li>
              <ULink to="/products" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                <Icon name="i-heroicons-wrench-screwdriver-20-solid" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span class="ml-3">New Products</span>
              </ULink>
            </li>
            <li>
              <ULink to="/products" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                <Icon name="i-heroicons-receipt-percent-20-solid" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span class="ml-3">Special Offers</span>
              </ULink>
            </li>
            <li>
                <ULink to="/products" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                <Icon name="i-heroicons-rocket-launch-20-solid" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span class="ml-3">Coming Soon Products</span>
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
  