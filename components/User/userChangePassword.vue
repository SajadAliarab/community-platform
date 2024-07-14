<script setup lang="ts">
import { z } from 'zod';
import { changePasswordUser } from '~/services/UserService';
const props = defineProps<{
    userDataID: number;
}>();
const schema = z.object({
    newPassword: z.string().min(8, 'Must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Must be at least 8 characters').refine((data) => data === password.newPassword, {
        message: "Passwords do not match"
    }),
});
const router = useRouter();
const password = reactive ({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''

})
const warning = ref<[boolean, string]>([false, '']);
const loadingBtn = ref(false);
const changePassword = async () => {
    loadingBtn.value = true;
    if(password.currentPassword===password.newPassword){
        warning.value = [true, 'New password must be different from the current password']
        loadingBtn.value = false;
        return;
    }
    const res = await changePasswordUser(props.userDataID, password.currentPassword, password.newPassword);
    if(res.result === true){
        warning.value = [false, 'Password changed successfully'];
        setTimeout(() => {
            localStorage.removeItem('token');
            router.push('/login');
        }, 2000);
    }else{
        warning.value = [true, res.message]
    }

}

</script>
<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold">Change Password</h1>
        <div class="mt-5">
         <UForm :schema="schema" :state="password" class="space-y-4" @submit="changePassword">
            <div class="flex flex-col gap-5 mt-5">
                <UFormGroup label="Current Password" name="currentPassword" required>
                <UInput v-model="password.currentPassword" type="password" />
                </UFormGroup>
                <UFormGroup label="New Password" name="newPassword" required>
                <UInput v-model="password.newPassword" type="password"  />
                </UFormGroup>
                <UFormGroup label="Confirm Password" name="confirmPassword" required>
                <UInput v-model="password.confirmPassword" type="password" />
                </UFormGroup>
                <div class="flex justify-end gap-5 mt-5">
                    <UButton color="primary" label="Change Password" type="submit" />
                    <UButton color="gray" label="Cancel" @click="$emit('isOpenChangePassword')" />
                </div>
                </div>
                <div v-if="warning[1]" :class="{ 'text-green-700': !warning[0], 'text-red-700': warning[0] }"
                    class="flex justify-center">
                    <h3 v-text="warning[1]"></h3>
                </div>
            </UForm>
            </div>
        </div>
</template>
