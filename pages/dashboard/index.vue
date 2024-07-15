<script setup lang="ts">

definePageMeta({
  middleware: 'user-auth'
})

</script>
<template>
  <UContainer>
    <UCard class="relative">
      <DashboardHeader />
      <DashboardTabs />
    </UCard>
  </UContainer>
</template>