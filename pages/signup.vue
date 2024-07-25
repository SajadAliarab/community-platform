
<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { RegisterModel } from '~/models/UserModel';
import { registerUser } from '~/services/UserService';

const schema = z.object({
  userName: z.string().min(3, 'Must be at least 3 characters'),
  fName : z.string().min(3, 'Must be at least 3 characters'),
  lName: z.string().optional(),  
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Must be at least 8 characters').refine((data) => data === userData.password, {
    message: "Passwords do not match"
  }),

})



type Schema = z.output<typeof schema>

const userData:RegisterModel = reactive({
    userName: '',
    fName: '',
    lName: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const selected = ref(false);
const warning = ref<[boolean, string]>([false, '']);
const loadingBtn=ref(false);
const router = useRouter();

async function onSubmit (event: FormSubmitEvent<Schema>) {
  if(!selected.value){
    warning.value = [true, 'Please accept the terms and conditions']
    return;
  }else{

    loadingBtn.value = true;
    await registerUser(userData)
    .then((res) => {
      if(res.status === 201){
        warning.value = [false, 'User registered successfully']
        router.push('/login')
      } else if(res.status === 400){
        warning.value = [true, 'User already exists']
      }else{
        warning.value = [true, 'Something went wrong']
      }
    })
    .catch((err) => {
      warning.value = [true, err.response.data.message]
    })
    .finally(() => {
      loadingBtn.value = false;
    })

    }
    
  }

</script>
<template>
<UContainer>
    <UCard>
    <template #header>
      <UAlert
    icon="i-heroicons-exclamation-triangle"
    color="primary"
    variant="solid"
    title="Important Notice!"
    description="This website is currently under construction and is only available for testing purposes. Please use fake or placeholder information when signing up. Your provided details will not be stored or used beyond this testing phase. We appreciate your understanding and cooperation."
  />
        <div class=" flex justify-center" >
        <h1 class=" font-extrabold" >Register User Form</h1>
        </div>
    </template>
<div class="flex justify-center">
    <UForm :schema="schema" :state="userData" class="space-y-4 w-1/2" @submit="onSubmit">
    <UFormGroup label="Username" name="userName" required>
      <UInput v-model="userData.userName" placeholder="your nickname " icon="i-heroicons-user"/>
    </UFormGroup>
    <UFormGroup label="First Name" name="fName" required>
      <UInput v-model="userData.fName"/>
    </UFormGroup>
    <UFormGroup label="Last Name" name="lName">
      <UInput v-model="userData.lName" />
    </UFormGroup>
    <UFormGroup label="Email" name="email" required>
      <UInput v-model="userData.email" icon="i-heroicons-envelope" placeholder="you@example.com" />
    </UFormGroup>

    <UFormGroup label="Password" name="password" required>
      <UInput v-model="userData.password" type="password"  icon="i-heroicons-key"/>
    </UFormGroup>
    <UFormGroup label="Confirm Password" name="confirmPassword">
      <UInput v-model="userData.confirmPassword" type="password" />
    </UFormGroup>
      <UFormGroup name="selected" label="I accept all policy and terms">
              <UToggle id="selected"  v-model="selected" />
            </UFormGroup>
    <UButton type="submit" :loading="loadingBtn">
      Submit
    </UButton>
  </UForm>
  </div>
    <template #footer>
          <div v-if="warning[1]" :class="{ 'text-green-700': !warning[0], 'text-red-700': warning[0] }" class="flex justify-center">
          <h3 v-text="warning[1]"></h3>
          </div>
       <div class="flex justify-center">
        <ULink to="/login">Already have an account? Login</ULink>
        </div>
        
    </template>
    </UCard>
</UContainer>
</template>