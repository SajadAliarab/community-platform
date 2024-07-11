<script setup lang="ts">
import { checkToken, getUserById, logoutUser } from '~/services/UserService';

import ThemeSwitcher from './ThemeSwitcher.vue';
import type { UserModel } from '~/models/UserModel';

const q = ref('')
const authenticated = ref(false);
const router = useRouter();
const userData:UserModel = reactive({
  id: 0,
  userName: '',
  fName: '',
  lName: '',
  email: '',
})
const items = [
  [{
    slot: 'account',
    disabled: true
  }], [{
    label: 'Your Profile',
    icon: 'i-heroicons-user',
    action: 'dashboard'
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-right-start-on-rectangle',
    action: 'signOut'
  }]
]
const   checkAuth = async() => {
  const token = localStorage.getItem('token');
  if(token){
    const res =await checkToken(token);
    if(res.status === 200){
      authenticated.value = true;
      const data = await res.json();
      const res2 = await getUserById(data.data);
      if(res2.status === 200){
        const user = await res2.json();
        userData.userName = user.data.userName;
        userData.fName = user.data.fName;
        userData.lName = user.data.lName;
        userData.email = user.data.email;
      }

    }else{
      authenticated.value = false;
      await logoutUser(token);
      localStorage.removeItem('token');
    }
   
  }
}
const signOut = async () => {
  try {
    // Fetch sign-out address
    const token = localStorage.getItem('token');
    if(!token){
      return;
    } else{
    const res = await logoutUser(token);
    if(res.status === 200){
      // Remove token from localStorage
      localStorage.removeItem('token');
      // Set authenticated to false
      authenticated.value = false;
      // Redirect to home or login page
      router.push('/');
    }else{
      console.log('Error signing out:', res);
    }
  }
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

const dashboard = () => {
  router.push('/dashboard');
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
    <router-link to="/login">
    <svg width="35" height="38" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-icon nav-right-side-link-icon" data-v-48b87f08=""><path fill-rule="evenodd" clip-rule="evenodd" d="M1.71506 14.644C1.60594 15.3455 1.62012 16.0599 1.75701 16.7568C2.0379 18.3088 2.74652 19.5029 3.3986 19.5977C5.02378 23.918 8.50578 28 12.5377 28C16.5697 28 20.058 23.9074 21.6832 19.5844C22.3098 19.4019 22.9691 18.2415 23.2336 16.7603C23.371 16.0638 23.3851 15.3496 23.2756 14.6484L1.71506 14.644V14.644ZM23.4818 11.1281H23.0614C23.0651 7.24941 20.8263 3.69725 17.2684 1.93647L16.3929 6.77765C16.3507 7.06172 16.1526 7.30095 15.876 7.40185C15.5994 7.50275 15.2881 7.44931 15.0639 7.26241C14.8397 7.07551 14.738 6.78482 14.7987 6.50392L15.7973 0.974437C15.4122 0.368393 14.7312 -0.000414827 13.998 3.50162e-07H11.0002C10.267 3.50162e-07 9.58663 0.368515 9.20085 0.974437L10.204 6.50392C10.2544 6.78069 10.1489 7.06252 9.9273 7.24325C9.70571 7.42397 9.40169 7.47615 9.12976 7.38011C8.85783 7.28407 8.65931 7.05442 8.60897 6.77765L7.73436 1.93824C4.1758 3.69749 1.93666 7.24959 1.94136 11.1281H1.5191C0.674243 11.1479 0 11.8189 0 12.6398C0 13.4607 0.674243 14.1316 1.5191 14.1515H23.4809C24.3258 14.1316 25 13.4607 25 12.6398C25 11.8189 24.3258 11.1479 23.4809 11.1281H23.4818V11.1281Z" fill="#3b82f6" data-v-48b87f08="">
    </path>
  </svg>
  <span class=" text-blue-500" >Sign In</span>
   </router-link>

  </div>
    <div v-if="authenticated" >
      <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UAvatar
     src="/images/profile.jpg" 
    size="lg"
     />

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