<script setup lang="ts">

import { z } from 'zod';
import { title } from '~/enums/title';
import type { UserDetailModel } from '~/models/UserDetailModel';
import { getUserDetail, updateUserDetail } from '~/services/UserDetailService';
import { enumToArray } from '~/utils/enumToArray';
import ThePhoneInput from '../UI/ThePhoneInput.vue';

const props = defineProps<{
  userData: {
    id: number;
    email: string;
    userName: string;
    fName: string;
    lName: string;
  }
}>();

const schema = z.object({
    userName: z.string().min(3, 'Must be at least 3 characters'),
    fName: z.string().min(3, 'Must be at least 3 characters'),
    lName: z.string().optional().nullable(),
    tagline: z.string().optional(),
    title: z.nativeEnum(title).optional(),
    website: z.string().url().optional(),
    mobile: z.string().optional(),
})

const userDetailData: any = ref({
    image:'',
    cover_image: '',
    tagline: '',
    title: title.Other,
    website: '',
    mobile: '',
    point:  0,
});
const loadingBtn = ref(false);
const warning = ref<[boolean, string]>([false, '']);
const titleOptions = enumToArray(title);


const getUser = async () => {
    const res = await getUserDetail(props.userData.id);
    if (res.result === true) {
        userDetailData.value.image =res.data.image;
        userDetailData.value.cover_image = res.data.cover_image;
        userDetailData.value.tagline = res.data.tagline;
        userDetailData.value.title = res.data.title;
        userDetailData.value.website = res.data.website;
        userDetailData.value.mobile = res.data.mobile;
        userDetailData.value.point = res.data.point;
    }
}


const handlePhoneNumberChange = (value: string) => {
  userDetailData.value.mobile = value;
};

const submitForm = async () => {
    loadingBtn.value = true;
    const res = await updateUserDetail(props.userData.id, userDetailData.value);
    if (res.result === true) {
        warning.value = [false, 'Profile updated successfully'];
        

    } else {
        warning.value = [true, 'Failed to update profile'];
    }
    loadingBtn.value = false;
}
getUser();

</script>
<template>
    <div class="p-4">
        <Placeholder class="h-48" />
        <h1 class="text-2xl font-bold">Edit Profile</h1>
        <UForm v-if="userData" :schema="schema" :state="userData" class="space-y-4" @submit="submitForm">
            <div class="flex flex-col gap-5 mt-5">
                <UFormGroup label="Email" name="userEmail" required>
                    <UInput v-model="userData.email" placeholder="your Email Address " icon="i-heroicons-at-symbol" disabled/>
                </UFormGroup>
                <UFormGroup label="Username" name="userName" required>
                    <UInput v-model="userData.userName" placeholder="your nickname " icon="i-heroicons-user" />
                </UFormGroup>
                <UFormGroup label="First Name" name="fName" required>
                    <UInput v-model="userData.fName" placeholder="your first Name " />
                </UFormGroup>
                <UFormGroup label="Last Name" name="lName">
                    <UInput v-model="userData.lName" placeholder="your last Name " />
                </UFormGroup>
                <UFormGroup label="Tagline" name="tagline">
                    <UInput v-model="userDetailData.tagline" placeholder="your tagline " />
                </UFormGroup>
                <UFormGroup label="Title" name="title" required>
                    <USelect v-model="userDetailData.title" :options="titleOptions" />
                </UFormGroup>
                <UFormGroup label="Website" name="website">
                    <UInput v-model="userDetailData.website" placeholder="your website " />
                </UFormGroup>
                <UFormGroup label="Mobile" name="mobile" >
                    <ThePhoneInput @update:phoneNumber="handlePhoneNumberChange" />
                </UFormGroup>
                <UFormGroup label="Point" name="point">
                    <UInput v-model="userDetailData.point" placeholder="your point " disabled />
                </UFormGroup>

            </div>
            <div class="flex justify-end gap-5 mt-5">
                <UButton color="green" label="Save"  type="submit" />
                <UButton color="gray" label="Cancel" @click="$emit('isOpenEdit')" />
            </div>
            <div v-if="warning[1]" :class="{ 'text-green-700': !warning[0], 'text-red-700': warning[0] }"
                    class="flex justify-center">
                    <h3 v-text="warning[1]"></h3>
                </div>
        </UForm>

    </div>
</template>