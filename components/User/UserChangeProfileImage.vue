<script setup lang="ts">

import { title } from '~/enums/title';
import { insertFile } from '~/services/FileService';
import {  updateUserDetail } from '~/services/UserDetailService';

const props = defineProps<{
    userDetailData: {
        user_id: number;
        image: string;
        cover_image: string;
        tagline: string;
        title: title;
        website: string;
        mobile: string;
        point: number;
    }
}>();
const loadingBtn = ref(false);
const image = ref();
const fileInput = ref<HTMLInputElement | null>(null);
const warning = ref<[boolean, string]>([false, '']);


const onFileChanged = () => {
    image.value = fileInput.value?.files
   props.userDetailData.image = image.value[0].name;
}
const changeCoverImage = async() => {
    const res = await insertFile(image.value[0]);
    if(res.result === true){
        const res2 = await updateUserDetail(props.userDetailData.user_id, props.userDetailData);
        if(res2.result === true){
        loadingBtn.value = true;
        warning.value = [false, 'Profile Image changed successfully'];
        setTimeout(() => {
           loadingBtn.value = false;
           location.reload();
        }, 2000);
    }else{
        warning.value = [true, res2.message];
        loadingBtn.value = false;

    }
    }else{
        warning.value = [true, res.message];
        loadingBtn.value = false;
    
    }
    
}



</script>
<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold">Change Profile Image</h1>
        <div class="mt-5">
          
                <div class="flex flex-col gap-5 mt-5">
                   
                        <input color="primary"  type="file" ref="fileInput" class=" w-full p-2.5 " @change="onFileChanged" />
        
                    <div class="flex justify-end gap-5 mt-5">
                        <UButton color="primary" label="Change profile Image" :loading="loadingBtn" @click="changeCoverImage" />
                        <UButton color="gray" label="Cancel" @click="$emit('isOpenProfileImage')" />
                    </div>
                    <div v-if="warning[1]" :class="{ 'text-green-700': !warning[0], 'text-red-700': warning[0] }"
                        class="flex justify-center">
                        <h3 v-text="warning[1]"></h3>
                        </div>
                </div>
            
        </div>
    </div>

</template>