<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import type { LoginModel } from "~/models/UserModel";
import { loginUser } from "~/services/UserService";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

console.log(apiUrl);

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const userData: LoginModel = reactive({
  email: "",
  password: "",
});

const remember = ref(false);
const warning = ref<[boolean, string]>([false, ""]);
const loadingBtn = ref(false);
const router = useRouter();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loadingBtn.value = true;
  console.log('onsubmit');
  try {
    const res = await loginUser(userData, remember.value);
    if (res.status === 200) {
      warning.value = [false, "User logged in successfully"];
      const data = await res.json();
      if (import.meta.client) {
      localStorage.setItem("token", data.data);
      router.push("/dashboard");
      }
    } else if (res.status === 401) {
      warning.value = [true, "Invalid credentials"];
    } else {
      warning.value = [true, "Something went wrong"];
    }
  } catch (err: any) {
    warning.value = [true, err.response.data.message];
  } finally {
    loadingBtn.value = false;
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
          title="Test User Login!"
          description="For testing purposes, you can use the following credentials to log in Email: test@gmail.com Password: test1234 Please remember, this is a test environment and all information will be reset. Thank you for helping us with the testing process!"
        />
        <div class="flex justify-center">
          <h1 class="font-extrabold">Log In</h1>
        </div>
      </template>
      <div class="flex justify-center">
        <UForm
          :schema="schema"
          :state="userData"
          class="space-y-4 w-1/2"
          @submit="onSubmit"
        >
          <UFormGroup label="Email" name="email" required>
            <UInput
              v-model="userData.email"
              icon="i-heroicons-envelope"
              placeholder="you@example.com"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password" required>
            <UInput
              v-model="userData.password"
              type="password"
              icon="i-heroicons-key"
            />
          </UFormGroup>
          <UCheckbox v-model="remember" label="Remember me" />
          <UButton type="submit" :loading="loadingBtn"> Submit </UButton>
        </UForm>
      </div>
      <template #footer>
        <div
          v-if="warning[1]"
          :class="{ 'text-green-700': !warning[0], 'text-red-700': warning[0] }"
          class="flex justify-center"
        >
          <h3 v-text="warning[1]"></h3>
        </div>
        <div class="flex justify-center">
          <ULink to="/signup">You have not an accoun? SignUp</ULink>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
