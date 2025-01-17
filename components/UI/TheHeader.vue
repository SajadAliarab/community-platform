<script setup lang="ts">
import { checkToken, getUserById, logoutUser } from '~/services/UserService';
import ThemeSwitcher from './ThemeSwitcher.vue';
import type { UserModel } from '~/models/UserModel';
import { getUserDetail } from '~/services/UserDetailService';
import { title } from '~/enums/title';

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

const q = ref('');
const authenticated = ref(false);
const router = useRouter();
const userData: UserModel = reactive({
  id: 0,
  userName: '',
  fName: '',
  lName: '',
  email: '',
});
const userDetailData: any = ref({
    image: '',
    cover_image: '',
    tagline: '',
    title: title.Other,
    website: '',
    mobile: '',
    point: 0,
});


const items = [
  [{ slot: 'account', disabled: true }],
  [{ label: 'Your Profile', icon: 'i-heroicons-user', action: 'dashboard' }],
  [{ label: 'Sign out', icon: 'i-heroicons-arrow-right-start-on-rectangle', action: 'signOut' }],
];

const checkAuth = async (): Promise<boolean> => {
  try {
    if (import.meta.client) {
    const token = localStorage.getItem('token');
    if (token) {
      const res = await checkToken(token);
      if (res.status === 429) {
        console.log('Rate limit exceeded. Please try again later.');
        return false;
      }
      if (res.status === 200) {
        const data = await res.json();
        const userRes = await getUserById(data.data);
        if (userRes.status === 200) {
          const user = await userRes.json();
          userData.id = user.data.id;
          userData.userName = user.data.userName;
          userData.fName = user.data.fName;
          userData.lName = user.data.lName;
          userData.email = user.data.email;
          authenticated.value = true;
          return true;
        }
      }
    }
    authenticated.value = false;
    return false;
  }
  } catch (error) {
    console.error('Error checking auth:', error);
    authenticated.value = false;
    return false;
  }
};

const getUser = async () => {
  const isAuthenticated = await checkAuth();
  if (isAuthenticated) {
    const res = await getUserDetail(userData.id);
    if (res.result === true) {
      userDetailData.value = res.data;
    } else {
      console.log(res.message);
      authenticated.value = false;
    }
  } else {
    authenticated.value = false;
  }
};

const signOut = async () => {
  if (import.meta.client) {
  const token = localStorage.getItem('token');
  if (!token) {
    return;
  }
  const res = await logoutUser(token);
  if (res.status === 200) {
    localStorage.removeItem('token');
    authenticated.value = false;
    router.push('/');
  } else {
    console.log('Error signing out:', res);
  }
}
};

const dashboard = () => {
  router.push('/dashboard');
};

onMounted(async () => {
  await checkAuth();
  await getUser();
});

watch(authenticated, async (isAuthenticated) => {
  if (isAuthenticated) {
    await getUser();
  }
});

router.beforeEach(async (to, from, next) => {
  await checkAuth();
  next();
});
</script>


<template>
<nav class="bg-gray-900 border-gray-200 dark:bg-primary-500 sticky">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img  src="/public/images/logo2.png" class=" w-36" alt="My Community Logo" />
  </a>
  <UInput
    v-model="q"
    class=" sr-only md:not-sr-only"
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
    <router-link to="/login">
      <img src="/public/images/login.png" class="h-10 w-10" alt="login image" />
   </router-link>

  </div>
    <div v-if="authenticated" >
      <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
        <img class="w-14 h-14 rounded-full border-4 border-primary-500 dark:border-gray-950 hover:border-primary-100"
        :src="`${apiUrl}/uploads/${userDetailData.image}`" alt="user photo">

    <template #account>
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ userData.userName}}
        </p>
      </div>
    </template>

    <template #item="{ item }">
    
      <span class="truncate"  @click="item.action === 'signOut' ? signOut() : dashboard()">{{ item.label }}</span>

      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"   />
  
    </template>
  </UDropdown>
  </div>
      <div class=" px-5">
      <ThemeSwitcher/>
  </div>
  </div>

  </div>
</nav>

</template>