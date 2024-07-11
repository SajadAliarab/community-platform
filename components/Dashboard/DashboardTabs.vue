<script setup lang="ts">


const items = [{
  label: 'Posts',
  icon: 'i-heroicons-book-open',
  content: 'This is the content shown for Tab1'
}, {
  label: 'Replies',
  icon: 'i-heroicons-at-symbol',
  content: 'And, this is the content for Tab2'
}, {
  label: 'Favorites',
  icon: 'i-heroicons-bookmark',
  content: 'Finally, this is the content for Tab3'
}]
</script>

<template>
  <UTabs :items="items" :ui="{ list:{background:'bg-primary-950 dark:bg-gray-950' , rounded:'rounded-2xs',tab:{inactive: 'text-gray-100 dark:text-gray-500'}}}" class="w-full ">
    <template #default="{ item, index, selected }">
      <div class="flex items-center gap-2 relative truncate">
        <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />

        <span class="truncate ">{{ index + 1 }}. {{ item.label }}</span>

        <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-100 dark:bg-primary-100" ></span>
      </div>
    </template>
  </UTabs>
</template>

