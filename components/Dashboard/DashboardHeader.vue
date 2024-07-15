<script setup lang="ts">
import { title } from '~/enums/title';
import type { UserModel } from '~/models/UserModel';
import { getUserDetail } from '~/services/UserDetailService';
import { checkToken, deleteUserById, getUserById, logoutUser } from '~/services/UserService';

const router = useRouter();
const isOpenDelete = ref(false);
const isOpenEdit = ref(false);
const isOpenChangePassword = ref(false);
const isOpenCoverImage = ref(false);
const isOpenProfileImage = ref(false);
const userData: any = reactive({
    id: 0,
    userName: '',
    fName: '',
    lName: '',
    email: '',
})
const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const res = await checkToken(token);
        if (res.status === 200) {
            const data = await res.json();
            const res2 = await getUserById(data.data);
            if (res2.status === 200) {
                const user = await res2.json();
                userData.id = user.data.id;
                userData.userName = user.data.userName;
                userData.fName = user.data.fName;
                userData.lName = user.data.lName;
                userData.email = user.data.email;
            }
        }
    }
}
checkAuth();
const userDetailData: any = ref({
    image: '',
    cover_image: '',
    tagline: '',
    title: title.Other,
    website: '',
    mobile: '',
    point: 0,
});

const getUser = async () => {
    await checkAuth();
    const res = await getUserDetail(userData.id);
    if (res.result === true) {
   userDetailData.value = res.data;
    } else {
        console.log(res.message);
    }
}
getUser();
const deleteUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const res = await logoutUser(token);
        if (res.status === 200) {
            const res2 = await deleteUserById(userData.id);
            if (res2.status === 200) {
                localStorage.removeItem('token');
                router.push('/');
            }
        }
    }
}
</script>
<template>
    <USkeleton v-if="!userDetailData.cover_image" class="h-28" />
        <div class="relative group">
        <img v-if="userDetailData.cover_image" :src="`http://localhost:8000/uploads/${userDetailData.cover_image}`" alt="hero" class="flex w-full h-28  transition duration-300 group-hover:blur-sm" />
        <div class="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
            <UButton color="primary" label="Change Cover" class="text-white" @click="isOpenCoverImage=true" />
            <UModal v-model="isOpenCoverImage">
                <UserChangeCoverImage :userDetailData="userDetailData" @isOpenCoverImage="isOpenCoverImage=false"/>
             </UModal>

        </div>
    </div>

    <div class="absolute top-24 pl-5 z-30 group ">
        <USkeleton v-if="!userDetailData.image" class="absolute ml-5 h-20 inset-0 flex justify-center items-center  rounded-full border-4 border-primary-950 dark:border-gray-950" />
        <img v-if="userDetailData.image" class="w-20 h-20 rounded-full border-4 border-primary-950 dark:border-gray-950 hover:border-primary-100"
        :src="`http://localhost:8000/uploads/${userDetailData.image}`" alt="user photo">
            <div class="absolute ml-5  inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-300 rounded-full cursor-pointer" @click ="isOpenProfileImage=true">
                <UModal v-model="isOpenProfileImage">
                    <UserChangeProfileImage :userDetailData="userDetailData" @isOpenProfileImage="isOpenProfileImage=false"/>
                </UModal>
            Change
        </div>
    </div>
  
    <div class=" w-full h-14 z-30 bg-primary-950 dark:bg-gray-950">
        <div class="flex justify-between items-end h-full px-5">
            <div class="flex items-center pl-20">
                <h1 class="hidden md:block text-white text-2xl font-bold">{{ userData.fName }}</h1>
            </div>
            <div class="flex flex-wrap z-30 justify-end items-center gap-2 sm:gap-5 mt-2 sm:mt-0">
                <UButton color="primary" label="Change Password" @click="isOpenChangePassword = true" />
                <UModal v-model="isOpenChangePassword">
                    <UserChangePassword :userDataID="userData.id" @isOpenChangePassword="isOpenChangePassword=false"/>
                </UModal>
                <UButton color="red" label="Delete Profile" @click="isOpenDelete = true" />
                <UModal v-model="isOpenDelete">
                    <div class="p-4">
                        <Placeholder class="h-48" />
                        <h1 class="text-2xl font-bold">Are you sure you want to delete your profile?</h1>
                        <div class="flex justify-end gap-5 mt-5">
                            <UButton color="red" label="Delete" @click ="deleteUser"/>
                            <UButton color="gray" label="Cancel" @click="isOpenDelete = false" />
                        </div>
                    </div>
                </UModal>
                <UButton color="gray" label="Edit Profile" @click="isOpenEdit=true" />
                <UModal v-model="isOpenEdit">
                    <UserEdit :userData="userData" @isOpenEdit="isOpenEdit=false"/>
                </UModal>
            </div>
        </div>
    </div>
</template>