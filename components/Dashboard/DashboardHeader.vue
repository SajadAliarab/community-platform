<script setup lang="ts">
import type { UserModel } from '~/models/UserModel';
import { checkToken, getUserById } from '~/services/UserService';

const router = useRouter();
const isOpenDelete = ref(false);
const isOpenEdit = ref(false);
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
</script>
<template>
    <img src="http://localhost:8000/uploads/sampleCoverImage.jpg" alt="hero" class=" flex w-full h-28" />
    <div class="absolute top-24 pl-5 z-30">
        <img class="w-20 h-20 rounded-full border-4 border-primary-950 dark:border-gray-950"
            src="http://localhost:8000/uploads/sampleProfile.jpg" alt="user photo">
    </div>
    <div class=" w-full h-14 bg-primary-950 dark:bg-gray-950">
        <div class="flex justify-between items-center h-full px-5">
            <div class="flex items-center pl-20">
                <h1 class="hidden md:block text-white text-2xl font-bold ">{{ userData.fName }}</h1>
            </div>
            <div class="flex justify-end">
                <UButton color="red" label="Delete Profile" class="mr-5" @click="isOpenDelete = true" />
                <UModal v-model="isOpenDelete">
                    <div class="p-4">
                        <Placeholder class="h-48" />
                        <h1 class="text-2xl font-bold">Are you sure you want to delete your profile?</h1>
                        <div class="flex justify-end gap-5 mt-5">
                            <UButton color="red" label="Delete" />
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