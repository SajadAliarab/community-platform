<script setup lang="ts">
import { checkToken } from '~/services/UserService';
import ThemeSwitcher from './ThemeSwitcher.vue';

const q = ref('')
const authenticated = ref(false);
const router = useRouter();
const   checkAuth = async() => {
  const token = localStorage.getItem('token');
  if(token){
    const res =await checkToken(token);
    if(res.status === 200){
      authenticated.value = true;
      const data = await res.json();
      console.log(data.data);
    }else{
      authenticated.value = false;
    }
   
  }
}

onMounted(() => {
  checkAuth();
})

router.beforeEach(async (to, from, next) => {
  await checkAuth();

  next();
});


</script>

<template>


<nav class="bg-gray-900 border-gray-200 dark:bg-primary-300 sticky">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="/public/svg/toolstation.svg" class="h-12" alt="Toolstation Logo" />
  </a>
  <UInput
    v-model="q"
    name="q"
    placeholder="Search..."
    icon="i-heroicons-magnifying-glass-20-solid"
    autocomplete="off"
    size="xl"
    :ui="{ icon: { trailing: { pointer: '' } } }"
  >
    <template #trailing>
      <UButton
        v-show="q !== ''"
        color="gray"
        variant="link"
        icon="i-heroicons-x-mark-20-solid"
        :padded="false"
        @click="q = ''"
      />
    </template>
  </UInput>
  <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  <div v-if="!authenticated" >
  <UButton color="gray">
    <router-link to="/login">Login</router-link>
  </UButton>
  </div>
    <div v-if="authenticated" >

    <UAvatar
    size="lg"
    src="/images/profile.jpg"
    alt="Avatar"
  />
  </div>
      <div class=" px-5">
      <ThemeSwitcher/>
  </div>
  </div>

  </div>
</nav>

</template>