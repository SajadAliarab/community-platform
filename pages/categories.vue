<script setup lang="ts">
import type { Category } from '~/models/CategoryModel';
import { getCategories } from '~/services/CategoryService';

const categories = ref<Category[]>([]);
const categoriesList = async () =>{
    const res = await getCategories();
    try{
        if (res.status === 200) {
;
            const data =await res.json();
            categories.value = data.data;
        } else {
            console.error('Error fetching categories:', res.statusText);
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}
onMounted(() => {
    categoriesList();
});
</script>
<template>
    <UContainer class="mt-4">
        <h1 class="text-2xl font-bold mb-4">Categories</h1>
        <div class="flex flex-wrap gap-4">
        <UCard v-for="category in categories" :key="category.id" class="mb-4 flex-1 basis-1/2 md:basis-1">
            <ULink :to="'/categories/' + category.slug" >
                <div class="w-full aspect-video mb-2 rounded-md overflow-hidden">
                    <img
                        :src="`http://localhost:8000/storage/${category.image}`"
                        alt="Category Image"
                        class="w-full h-48 object-cover"
                    />
                </div>
                <h2 class="text-lg font-semibold">{{ category.name }}</h2>
                <p>{{ category.description }}</p>
                </ULink>
        </UCard>
        </div>
    </UContainer>
</template>